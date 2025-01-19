
// EdgeDB schema for TokenPrice entity
export class TokenPrice {
    tokenAddress: string;
    price: number;
    volume24h: number;
    liquidity: number;
    marketCap: number;
    timestamp: Date;

    constructor(tokenAddress: string) {
        this.tokenAddress = tokenAddress;
        this.price = 0;
        this.volume24h = 0;
        this.liquidity = 0;
        this.marketCap = 0;
        this.timestamp = new Date();
    }
} 