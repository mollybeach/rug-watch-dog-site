import client from '../db/edgedbClient';
import e from '../dbschema/edgeql-js';
const SAMPLE_TOKENS = [
    {
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
        name: 'Tether USD',
        symbol: 'USDT'
    },
    {
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC'
    },
    {
        address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', // MATIC
        name: 'Polygon',
        symbol: 'MATIC'
    }
];
async function seedDatabase() {
    try {
        for (const token of SAMPLE_TOKENS) {
            const query = e.insert(e.Token, {
                address: token.address,
                name: token.name,
                symbol: token.symbol
            });
            await query.run(client);
            console.log(`Seeded token: ${token.name}`);
        }
        console.log('✅ Database seeding completed');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
    }
}
seedDatabase();
