# 🐕 Rug Watch Dog 🤖🔗

Welcome to the **Rug Watch Dog**, an advanced AI-driven platform that helps investors analyze cryptocurrency tokens, especially meme coins 🐕💰, to detect potential "rug pulls" 🛑. This project combines cutting-edge machine learning 📊, blockchain data analysis 🔗, and chatbot integration 🤝 to enhance security 🔒 in the crypto ecosystem

Check out the live demo: [RugWatchDog](https://rugwatchdog.vercel.app/)

![Rug Watch Dog](https://res.cloudinary.com/storagemanagementcontainer/image/upload/v1736885394/rug-watch-dog_r8dx8l.png)

## 🌟 Features
- **AI Risk Analysis**: Automatically analyze meme coins for risks like insider holding %, sniper wallet activity, and volume anomalies
- **Blockchain Data Fetching**: Integrates with APIs (Etherscan, DexScreener) to fetch real-time token and transaction data
- **Eliza Chatbot Integration**: Interact with a conversational AI assistant on Discord, Telegram, and Twitter for real-time insights
- **FUD Alerts**: Automatically generate social media alerts for high-risk tokens to keep the community informed
- **Customizable AI Models**: Train and adapt the AI to detect emerging fraud patterns in the crypto ecosystem
- **Database**: PostgreSQL on AWS RDS
- **ORM**: Vercel Postgres SDK
- **Deployment**: Vercel

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React Context
- **Data Visualization**: Plotly.js, D3 Force Graph
- **Chatbot**: Discord, Telegram, Twitter

### Backend
- **Runtime**: Node.js 20
- **API**: Next.js API Routes
- **Database**: PostgreSQL on AWS RDS
- **ORM**: Vercel Postgres SDK

### Blockchain
- **Web3 Libraries**: ethers.js v5, web3.js
- **Smart Contracts**: Solidity, OpenZeppelin
- **Development**: Hardhat, Waffle

### Machine Learning
- **Data Processing**: TypeScript
- **Model Training**: Custom ML implementation
- **Metrics Analysis**: Statistical analysis tools

### Testing
- **Framework**: Jest
- **Types**: TypeScript
- **Coverage**: ts-jest

### Deployment
- **Platform**: AWS Amplify
- **CI/CD**: GitHub Actions
- **Database**: AWS RDS (PostgreSQL)
- **Storage**: AWS S3
- **Environment**: Production, Preview, Development

## 🛠️ Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mollybeach/rug-watch-dog.git
cd rug-watch-dog
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
# API Keys
ETHERSCAN_API_KEY=your_etherscan_key_here
BSCSCAN_API_KEY=your_bscscan_api_key_here
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here

# Database Configuration
POSTGRES_URL=your_database_url
POSTGRES_URL_NON_POOLING=your_non_pooling_url
POSTGRES_SSL=true
POSTGRES_SSL_REJECT_UNAUTHORIZED=true

# RPC Endpoints
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/your_key
BSC_RPC=https://bsc-dataseed1.binance.org
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/your_key
```

### 4. Available Scripts

#### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run linter

#### Testing
- `pnpm test` - Run all tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test-db` - Test database connection

#### Deployment
- `pnpm deploy` - Deploy to Vercel
- `pnpm export` - Export static version

## 📊 Model Training

The model is trained on a diverse dataset including:
- 15 known rug pull tokens (including SQUID, SAFEMOON, LUNA Classic)
- 15 legitimate tokens (including WETH, USDC, UNI)

Training data is collected from:
- Etherscan (holder data, contract info)
- DexScreener (price, volume, liquidity data)


## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.


## 📜 Database Schema

The database schema is defined in the `dbschema` directory. The schema is defined in the `default.esdl` file. The schema is generated using the `edgedb-cli` command `edgedb schema generate`.

The schema is generated using the `edgedb-cli` command `edgedb schema generate`.


## 📜 Database Migrations

The database migrations are defined in the `migrations` directory. The migrations are generated using the `edgedb-cli` command `edgedb migration generate`.



Using EdgeDB Shell
1. Open EdgeDB Shell:
Run the following command in your terminal to open the EdgeDB interactive shell:
```bash
edgedb
```
2. List All Object Types:
Use the following EdgeQL command to list all object types (tables) and their properties:

```bash 
     SELECT schema::ObjectType {
         name,
         properties: {
             name,
             target: {
                 name
             }
         }
     } FILTER .name LIKE 'default::%';
```

Step 1: Create a New Migration
1. Ensure Your Schema is Updated: Make sure your .esdl files reflect the current desired schema state.
2. Create a Migration:
Run the following command in your terminal to create a new migration:

```bash
edgedb migration create
```

3. Apply the Migration:
Run the following command in your terminal to apply the migration:

```bash
 edgedb migrate
```


```bash
edgedb migrate -I mollybeach/rug-watch-dog-db

To check the contents of your EdgeDB database, you can use the EdgeDB shell to run a SELECT query. Here’s how you can do it:
Select Data:
Execute a SELECT query to retrieve data from the TokenMetrics table. For example:
```
```bash
     SELECT TokenMetrics {
         id,
         tokenAddress,
         volumeAnomaly,
         holderConcentration,
         liquidityScore,
         priceVolatility,
         sellPressure,
         marketCapRisk,
         bundlerActivity,
         accumulationRate,
         stealthAccumulation,
         suspiciousPattern,
         timestamp
     };
```