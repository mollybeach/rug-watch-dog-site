import { NextResponse } from 'next/server';
import pool from '@/lib/db/config';
import { DatabaseError } from 'pg';

interface RiskMetricsRow {
    address: string;
    name: string;
    symbol: string;
    volumeAnomaly: number;
    holderConcentration: number;
    liquidityScore: number;
    priceVolatility: number;
    sellPressure: number;
    marketCapRisk: number;
    bundlerActivity: number;
    accumulationRate: number;
    stealthAccumulation: number | null;
    suspiciousPattern: boolean | null;
    isRugPull: boolean;
    metadata: { reason: string };
    timestamp: string;
}

interface PostgresError extends Error {
    code?: string;
    detail?: string;
    hint?: string;
    position?: string;
    internalPosition?: string;
    internalQuery?: string;
    where?: string;
    schema?: string;
    table?: string;
    column?: string;
    dataType?: string;
    constraint?: string;
    file?: string;
    line?: string;
    routine?: string;
}

export async function GET() {
    try {
        console.log('Starting risk metrics API request...');
        console.log('All env vars:', {
            DB_HOST: process.env.DB_HOST,
            DB_USERNAME: process.env.DB_USERNAME,
            DB_NAME: process.env.DB_NAME,
            DB_PORT: process.env.DB_PORT,
            NODE_ENV: process.env.NODE_ENV,
            PWD: process.cwd()
        });

        // First test the connection and check table structure
        try {
            console.log('Testing database connection and checking schema...');
            const testResult = await pool.query('SELECT NOW()');
            console.log('Database connection test successful:', testResult.rows[0]);
            
            // Check table structure
            const schemaQuery = `
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'token_metrics';
            `;
            const schemaResult = await pool.query(schemaQuery);
            console.log('Table structure:', schemaResult.rows);
        } catch (connError) {
            const pgError = connError as PostgresError;
            console.error('Database connection test failed:', {
                name: pgError.name,
                message: pgError.message,
                code: pgError.code,
                detail: pgError.detail
            });
            throw pgError;
        }

        console.log('Executing main database query...');
        const query = `
            SELECT DISTINCT ON (t.address)
                t.address,
                t.name,
                t.symbol,
                tm.volumeAnomaly,
                tm.holderConcentration,
                tm.liquidityScore,
                tm.priceVolatility,
                tm.sellPressure,
                tm.marketCapRisk,
                tm.bundlerActivity,
                tm.accumulationRate,
                tm.stealthAccumulation,
                tm.suspiciousPattern,
                tm.isRugPull,
                tm.metadata,
                tm.timestamp
            FROM tokens t
            LEFT JOIN token_metrics tm ON t.address = tm.tokenAddress
            WHERE tm.timestamp >= NOW() - INTERVAL '24 hours'
            ORDER BY t.address, tm.timestamp DESC
            LIMIT 25;
        `;

        const result = await pool.query<RiskMetricsRow>(query);
        console.log(`Query completed. Found ${result.rows.length} rows`);
        
        if (result.rows.length === 0) {
            return NextResponse.json({
                success: true,
                data: [],
                metadata: {
                    totalTokens: 0,
                    highRiskCount: 0,
                    mediumRiskCount: 0,
                    lowRiskCount: 0,
                    timestamp: new Date().toISOString()
                }
            });
        }

        const processedData = result.rows.map(row => {
            const riskScore = calculateRiskScore(row);
            const riskCategory = categorizeRisk(riskScore);
            
            return {
                address: row.address,
                name: row.name,
                symbol: row.symbol,
                volumeAnomaly: row.volumeAnomaly,
                holderConcentration: row.holderConcentration,
                liquidityScore: row.liquidityScore,
                priceVolatility: row.priceVolatility,
                sellPressure: row.sellPressure,
                marketCapRisk: row.marketCapRisk,
                bundlerActivity: row.bundlerActivity,
                accumulationRate: row.accumulationRate,
                stealthAccumulation: row.stealthAccumulation,
                suspiciousPattern: row.suspiciousPattern,
                isRugPull: row.isRugPull,
                riskScore: riskScore.toFixed(2),
                riskCategory,
                reason: row.metadata.reason
            };
        });

        return NextResponse.json({
            success: true,
            data: processedData,
            metadata: {
                totalTokens: result.rows.length,
                highRiskCount: processedData.filter(row => row.riskCategory === 'High').length,
                mediumRiskCount: processedData.filter(row => row.riskCategory === 'Medium').length,
                lowRiskCount: processedData.filter(row => row.riskCategory === 'Low').length,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        const pgError = error as PostgresError;
        console.error('Database error details:', {
            name: pgError.name,
            message: pgError.message,
            code: pgError.code,
            detail: pgError.detail,
            where: pgError.where,
            hint: pgError.hint,
            position: pgError.position,
            internalPosition: pgError.internalPosition,
            internalQuery: pgError.internalQuery,
            schema: pgError.schema,
            table: pgError.table,
            column: pgError.column,
            dataType: pgError.dataType,
            constraint: pgError.constraint,
            file: pgError.file,
            line: pgError.line,
            routine: pgError.routine
        });

        return NextResponse.json({ 
            success: false,
            error: 'Failed to fetch risk metrics',
            message: pgError.message || 'Unknown error',
            details: process.env.NODE_ENV === 'development' ? {
                name: pgError.name,
                message: pgError.message,
                code: pgError.code,
                detail: pgError.detail
            } : undefined
        }, { 
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });
    }
}

function calculateRiskScore(metrics: RiskMetricsRow): number {
    const weights = {
        volumeAnomaly: 0.2,
        holderConcentration: 0.2,
        liquidityScore: 0.15,
        priceVolatility: 0.15,
        sellPressure: 0.15,
        marketCapRisk: 0.1,
        accumulationRate: 0.05
    };

    let score = 0;
    score += metrics.volumeAnomaly * weights.volumeAnomaly;
    score += metrics.holderConcentration * weights.holderConcentration;
    score += (1 - metrics.liquidityScore) * weights.liquidityScore;
    score += metrics.priceVolatility * weights.priceVolatility;
    score += metrics.sellPressure * weights.sellPressure;
    score += metrics.marketCapRisk * weights.marketCapRisk;
    score += metrics.accumulationRate * weights.accumulationRate;

    return Math.min(Math.max(score * 100, 0), 100);
}

function categorizeRisk(score: number): string {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
} 