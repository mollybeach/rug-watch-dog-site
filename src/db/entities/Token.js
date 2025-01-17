// EdgeDB schema for Token entity
export class Token {
    address;
    name;
    symbol;
    createdAt;
    updatedAt;
    constructor(address, name, symbol) {
        this.address = address;
        this.name = name;
        this.symbol = symbol;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
