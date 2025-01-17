// EdgeDB schema for TokenMetrics entity
export class TokenMetrics {
    id;
    token;
    tokenAddress;
    volumeAnomaly;
    holderConcentration;
    // Add other properties as needed
    constructor(id, token, tokenAddress, volumeAnomaly, holderConcentration) {
        this.id = id;
        this.token = token;
        this.tokenAddress = tokenAddress;
        this.volumeAnomaly = volumeAnomaly;
        this.holderConcentration = holderConcentration;
        // Initialize other properties as needed
    }
}
