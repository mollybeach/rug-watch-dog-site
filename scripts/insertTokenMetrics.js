import fs from 'fs';
import csv from 'csv-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function importTokenMetrics() {
    const results = [];

    fs.createReadStream('dbschema/token_metrics.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async() => {
            try {
                for (const row of results) {
                    const response = await fetch("https://rug-watch-dog-db--mollybeach.c-96.i.aws.edgedb.cloud:5656", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.EDGEDB_SECRET_KEY}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            query: `
                                INSERT TokenMetrics {
                                    metadata := <str>'${row.metadata}',
                                    tokenAddress := <str>'${row.tokenAddress}',
                                    volumeAnomaly := <decimal>${row.volumeAnomaly},
                                    holderConcentration := <decimal>${row.holderConcentration},
                                    liquidityScore := <decimal>${row.liquidityScore},
                                    priceVolatility := <decimal>${row.priceVolatility},
                                    sellPressure := <decimal>${row.sellPressure},
                                    marketCapRisk := <decimal>${row.marketCapRisk},
                                    bundlerActivity := <bool>${row.bundlerActivity},
                                    accumulationRate := <decimal>${row.accumulationRate},
                                    stealthAccumulation := <decimal>${row.stealthAccumulation},
                                    suspiciousPattern := <bool>${row.suspiciousPattern},
                                    isRugPull := <bool>${row.isRugPull},
                                    timestamp := <datetime>'${row.timestamp}',
                                    holders := <int32>${row.holders},
                                    total_supply := <int32>${row.total_supply},
                                    current_price := <decimal>${row.current_price},
                                    is_honeypot := <bool>${row.is_honeypot}
                                };
                            `
                        })
                    });

                    const text = await response.text();
                    console.log('Response Text:', text);

                    const data = JSON.parse(text);
                    console.log(data);
                }
                console.log('Data imported successfully');
            } catch (error) {
                console.error('Error importing data:', error);
            }
        });
}

importTokenMetrics();