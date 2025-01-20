// src/data-processing/trainingData.ts

import { getAllTokens } from '../db/services/TokenService';
import { TokenDataType } from '../types/data';
import { formatToken, defaultToken } from '../utils/formatData';

export async function loadExistingData(): Promise<TokenDataType[]> {
    try {
        const tokens = await getAllTokens();
        return tokens.map(token => {
            try {
                return formatToken(token);
            } catch (error) {
                console.error(`Error formatting token ${token.address}:`, error);
                return defaultToken();
            }
        });
    } catch (error) {
        console.error('Error loading existing data:', error);
        return [];
    }
}

export async function collectTrainingData(numTokens: number = 100): Promise<TokenDataType[]> {
    console.log('Collecting Training Data');
    return loadExistingData();
}