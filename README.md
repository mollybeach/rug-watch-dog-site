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
Welcome to the **Rug Watch Dog**, an advanced AI-driven platform that helps investors analyze cryptocurrency tokens, especially meme coins 🐕💰, to detect potential "rug pulls" 🛑. This project combines cutting-edge machine learning 📊, blockchain data analysis 🔗, and chatbot integration 🤝 to enhance security 🔒 in the crypto ecosystem.
Check out the live demo: [RugWatchDog](https://rugwatchdog.vercel.app/)

![Rug Watch Dog](./assets/images/rug-watch-dog.png)

## 🌟 Features

- **AI Risk Analysis**: Automatically analyze meme coins for risks like insider holding %, sniper wallet activity, and volume anomalies.
- **Blockchain Data Fetching**: Integrates with APIs (Etherscan, DexScreener) to fetch real-time token and transaction data.
- **EdgeDB Database**: Stores and retrieves token data and model predictions.
- **Eliza Chatbot Integration**: Interact with a conversational AI assistant on Discord, Telegram, and Twitter for real-time insights.
- **FUD Alerts**: Automatically generate social media alerts for high-risk tokens to keep the community informed.
- **Customizable AI Models**: Train and adapt the AI to detect emerging fraud patterns in the crypto ecosystem.

## 🔄 Application Flow

```
User Request
    │
    ▼
API Layer (src/api/)
    │
    ▼
Data Collection Layer
    │
    ├─► Etherscan API
    │   (src/data-harvesting/fetcher.ts)
    │
    └─► DexScreener API
        (src/data-harvesting/fetcher.ts)
    │
    ▼
Data Processing
    │
    ├─► Token Metrics
    │   (src/data-processing/metrics.ts)
    │
    └─► Data Storage
        (src/data-processing/storage.ts)
    │
    ▼
ML Analysis
    │
    ├─► Model Prediction
    │   (src/training/predictor.ts)
    │
    └─► Risk Evaluation
        (src/training/evaluator.ts)
    │
    ▼
Response/Alerts
    │
    ├─► API Response
    │   (src/api/routes/)
    │
    └─► Social Integrations
        (src/integrations/)
```

### Process Explanation:

1. **Input**: User submits a token address for analysis
2. **Data Collection**: System fetches data from multiple sources
3. **Processing**: Raw data is transformed into risk metrics
4. **Analysis**: AI model evaluates the risk factors
5. **Output**: Generates alerts or stores results for training


For more details on each step, see the documentation below.

## 🔧 Technical Architecture

### 1. API Layer (`src/api/`)
- `routes/`: API endpoint handlers
  - `analyze.ts`: Token analysis endpoints
  - `metrics.ts`: Metrics retrieval
  - `tokens.ts`: Token management
- `middleware/`: Request processing
  - `auth.ts`: Authentication handling

### 2. Data Collection (`src/data-harvesting/`)
- `fetcher.ts`: External API integrations
- `collector.ts`: Data collection orchestration
- `chainMonitor.ts`: Blockchain scanning
- `tokenScanner.ts`: Token-specific scanning

### 3. Data Processing (`src/data-processing/`)
- `metrics.ts`: Token metrics calculation
- `parser.ts`: Raw data parsing
- `storage.ts`: Data persistence layer

### 4. Machine Learning (`src/training/`)
- `modelPredictor.ts`: Risk prediction logic
- `modelEvaluator.ts`: Model evaluation
- `modelTrainer.ts`: Model training pipeline

### 5. Database Layer (`src/db/`)
- `models/`: Database schemas
- `migrations/`: Database migrations
- `connection.ts`: Database configuration

### 6. Monitoring & Scripts (`src/scripts/`)
- `collect-data.ts`: Training data collection
- `clean-db.ts`: Database maintenance
- `train.ts`: Model training execution

### 7. Types & Utils (`src/types/`, `src/utils/`)
- `api.ts`: API interfaces
- `data.ts`: Data structure types
- `utils.ts`: Helper functions

### 8. Model Storage (`/models/`)
- `datasets/`: Training datasets
- `trained/`: Trained model files

### 9. Integration Layer
- `src/chat/index.ts`: Chat interface implementation
- `src/clients/index.ts`: Social media client integrations
- `src/cache/index.ts`: Performance optimization
---



## 🔧 Database Schema

The database schema is defined in the `dbschema` directory. The schema is specified in the `default.esdl` file. You can generate the schema using the EdgeDB CLI with the following command:

```bash
edgedb schema generate
```

## 🔧 Database Migrations

Database migrations are managed in the `migrations` directory. You can generate migrations using the EdgeDB CLI with the following command:

```bash
edgedb migration generate
```

## Using EdgeDB Shell

1. **Open EdgeDB Shell**:
   Run the following command in your terminal to open the EdgeDB interactive shell:
   ```bash
   edgedb
   ```

2. **List All Object Types**:
   Use the following EdgeQL command to list all object types (tables) and their properties:
   ```edgeql
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

## Step-by-Step Guide for Migrations

1. **Create a New Migration**:
   - Ensure your `.esdl` files reflect the current desired schema state.
   - Run the following command to create a new migration:
     ```bash
     edgedb migration create
     ```

2. **Apply the Migration**:
   - Run the following command to apply the migration:
     ```bash
     edgedb migrate
     ```

3. ** Create a new migration and apply it to the cloud instance and generate the query builder
```bash
     edgedb migration create 
     edgedb migrate
     edgedb migrate -I mollybeach/rug-watch-dog-db
     pnpm generate edgeql-js
```

4. Connect to the EdgeDB instance
```bash
     edgedb -I mollybeach/rug-watch-dog-db
```

5. Write a SELECT query to check the data
```edgeql
    SELECT Token {
    address,
    name,
    symbol,
    metrics: {
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
        isRugPull,
        timestamp,
        holders,
        totalSupply,
        currentPrice,
        isHoneyPot
    },
    price: {
        tokenAddress,
        price,
        liquidity,
        volume24h,
        marketCap,
        timestamp
    },
    createdAt,
    updatedAt
};

SELECT TokenMetrics;
```


## Checking Data in EdgeDB

To check the contents of your EdgeDB database, you can use the EdgeDB shell to run a `SELECT` query. Here’s how you can do it:

- **Select Data**:
  Execute a `SELECT` query to retrieve data from the `TokenMetrics` table. For example:
  ```edgeql
SELECT TokenMetrics;
SELECT TokenPrices;
  ```

  4. Login to EdgeDB
  ```edgeql
 edgedb cloud login
  ```

5. Connect to Your EdgeDB Instance:
Use the edgedb command to connect to your EdgeDB instance. You will need the connection details such as host, port, username, and database name. Here’s an example command:
```bash
edgedb -H your-edgedb-host -P your-port -u your-username -d your-database
```
or
```bash
edgedb -I your-instance-name
```
Generate the Query builder
```bash
pnpm generate edgeql-js
```

Migrate to the cloud instance
```
edgedb migrate -I mollybeach/rug-watch-dog-db
```
To close the EdgeDB shell, type `CTRL + D` and press Enter.

---

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
# RPC Endpoints
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/your_alchemy_api_key
BSC_RPC=https://bsc-dataseed1.binance.org
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/your_alchemy_api_key

# Discord Integration (Optional)
DISCORD_APPLICATION_ID=your_discord_app_id
DISCORD_API_TOKEN=your_discord_bot_token

# OpenRouter AI (Optional)
OPENROUTER_API_KEY=your_openrouter_key

# Twitter Bot Integration (Optional)
TWITTER_USERNAME=your_twitter_username
TWITTER_PASSWORD=your_twitter_password
TWITTER_EMAIL=your_twitter_email

# API URLs
ETHERSCAN_API_URL=https://api.etherscan.io/api
DEX_SCREENER_API_URL=https://api.dexscreener.com/latest/
ALCHEMY_API_URL=https://eth-mainnet.g.alchemy.com/v2/

# Server Configuration
PORT=3000
NODE_ENV=development
```

Note: DexScreener API does not require an API key but has a rate limit of 300 requests per minute.

### 4. Quick Commands
- Use ⌘K to generate a command
- Common commands:
  ```bash
  pnpm start        # Start the server
  pnpm train        # Train the model
  pnpm collect-data # Collect training data
  pnpm test         # Run tests
  ```

## 🔧 Troubleshooting

### Common TypeScript Errors

1. **Property Missing Error**
```typescript
Property 'marketCap' does not exist on type '{ volumeAnomaly: boolean; holderConcentration: boolean; liquidityScore: boolean; }'
```
Fix: Ensure your interfaces match the data structure:
```typescript
interface TokenMetrics {
  volume: number;
  holders: number;
  liquidity: number;
  priceChange24h: number;
  buyTxns24h: number;
  sellTxns24h: number;
  marketCap: number;
  totalSupply: number;
  currentPrice: number;
  isRugPull: boolean;
  isHoneyPot: boolean;
  timestamp: Date;
}
```

2. **Training Data Type Mismatch**
```typescript
Argument of type '{ volumeAnomaly: number; holderConcentration: number; liquidityScore: number; isRugPull: boolean; }[]' is not assignable to parameter of type 'TrainingData[]'
```
Fix: Make sure your training data includes all required fields:
```typescript
interface TrainingData {
  volumeAnomaly: number;
  holderConcentration: number;
  liquidityScore: number;
  priceVolatility: number;
  sellPressure: number;
  marketCapRisk: number;
  isRugPull: boolean;
}
```

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

```bash
SELECT TokenMetrics {
    metadata: string,
    tokenAddress: string,
    volumeAnomaly: number,
    holderConcentration: number,
    liquidityScore: number,
    priceVolatility: number,
    sellPressure: number,
    marketCapRisk: number,
    bundlerActivity: boolean,
    accumulationRate: number,
    stealthAccumulation: number,
    suspiciousPattern: boolean,
    isRugPull: boolean,
    timestamp: Date,
};
```

To close the EdgeDB shell, type `CTRL + D` and press Enter.


  4. Login to EdgeDB
  ```bash
 edgedb cloud login
  ```

5. Connect to Your EdgeDB Instance:
Use the edgedb command to connect to your EdgeDB instance. You will need the connection details such as host, port, username, and database name. Here’s an example command:
```bash
edgedb -H your-edgedb-host -P your-port -u your-username -d your-database
```

To close the EdgeDB shell, type `CTRL + D` and press Enter.
## 🚀 Usage

1. Analyze a token:
```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"tokenAddress":"0x..."}'
```
