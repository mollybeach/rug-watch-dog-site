CREATE MIGRATION m1i2iva54cgpgfijknvdk6ulypx4cx2tpotc7spfaijgqmyuteyvxq
    ONTO initial
{
  CREATE TYPE default::Token {
      CREATE REQUIRED PROPERTY address: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(42);
      };
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY metrics: std::str;
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::max_len_value(255);
      };
      CREATE REQUIRED PROPERTY symbol: std::str {
          CREATE CONSTRAINT std::max_len_value(10);
      };
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::TokenMetrics {
      CREATE REQUIRED PROPERTY holderConcentration: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY holders: std::int16 {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY isRugPull: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY isHoneyPot: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY liquidityScore: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY marketCapRisk: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY priceVolatility: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY risk_score: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY sellPressure: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY tokenAddress: std::str;
      CREATE REQUIRED PROPERTY totalSupply: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY volumeAnomaly: std::decimal {
          SET default := 0;
      };
  };
  CREATE TYPE default::TokenPrices {
      CREATE REQUIRED PROPERTY liquidity: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY marketCap: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY price: std::decimal {
          SET default := 0;
      };
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY tokenAddress: std::str;
      CREATE REQUIRED PROPERTY volume_24h: std::decimal {
          SET default := 0;
      };
  };
};
