// EdgeDB schema for TokenPrice entity
export class TokenPrice {
    tokenAddress;
    price;
    volume24h;
    marketCap;
    liquidity;
    timestamp;
    // Add other properties as needed
    constructor(tokenAddress, price, volume24h, marketCap, liquidity, timestamp) {
        this.tokenAddress = tokenAddress;
        this.price = price;
        this.volume24h = volume24h;
        this.marketCap = marketCap;
        this.liquidity = liquidity;
        this.timestamp = timestamp;
    }
}