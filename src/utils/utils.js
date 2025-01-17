import { ethers } from 'ethers';
/**
 * Calculate variance of a numeric array
 */
export function calculateVariance(values) {
    if (values.length === 0)
        return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
}
/**
 * Format a number to a fixed number of decimal places
 */
export function formatNumber(value, decimals = 2) {
    return value.toFixed(decimals);
}
/**
 * Convert Wei to Ether
 */
export function weiToEther(wei) {
    return parseFloat(ethers.formatEther(wei.toString()));
}
/**
 * Convert Gwei to Ether
 */
export function gweiToEther(gwei) {
    return parseFloat(ethers.formatUnits(gwei.toString(), 'gwei'));
}
/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0)
        return 0;
    return ((newValue - oldValue) / oldValue) * 100;
}
/**
 * Group array elements by a key
 */
export function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const groupKey = String(item[key]);
        acc[groupKey] = acc[groupKey] || [];
        acc[groupKey].push(item);
        return acc;
    }, {});
}
/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Retry a function with exponential backoff
 */
export async function retry(fn, maxAttempts = 3, baseDelay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts)
                break;
            const delay = baseDelay * Math.pow(2, attempt - 1);
            await sleep(delay);
        }
    }
    throw lastError;
}
