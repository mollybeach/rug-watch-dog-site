// EdgeDB schema for Token entity
import { TokenMetrics } from './TokenMetrics';
import { TokenPrice } from './TokenPrice';
import { TokenRisk } from './TokenRisk';

export class Token {
    address: string;
    name: string;
    symbol: string;
    metrics: TokenMetrics;
    price: TokenPrice;
    risk: TokenRisk;
    createdAt: Date;
    updatedAt: Date;

    constructor(address: string, name: string, symbol: string) {
        this.address = address;
        this.name = name;
        this.symbol = symbol;
        this.metrics = new TokenMetrics(address);
        this.price = new TokenPrice(address);
        this.risk = new TokenRisk(address);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
} 