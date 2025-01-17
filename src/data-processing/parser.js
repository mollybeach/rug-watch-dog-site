export function normalizeFeatures(data) {
    return [
        data.volumeAnomaly,
        data.holderConcentration,
        data.liquidityScore,
        data.priceVolatility,
        data.sellPressure,
        data.marketCapRisk,
        data.bundlerActivity ? 1 : 0,
        data.accumulationRate,
        data.stealthAccumulation || 0,
        data.suspiciousPattern ? 1 : 0
    ];
}
export function preprocessTokenData(data) {
    return {
        features: data.map(token => normalizeFeatures(token)),
        labels: data.map(token => token.isRugPull ? 1 : 0)
    };
}
