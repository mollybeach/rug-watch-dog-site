CREATE MIGRATION m1mvvnnmj3daoiwkgvsy6r5rpnrocqbjcfrrv3gokrbvise6ttkeqa
    ONTO m1i2iva54cgpgfijknvdk6ulypx4cx2tpotc7spfaijgqmyuteyvxq
{
  ALTER TYPE default::Token {
      ALTER PROPERTY address {
          DROP CONSTRAINT std::max_len_value(42);
      };
  };
  ALTER TYPE default::Token {
      ALTER PROPERTY created_at {
          RENAME TO createdAt;
      };
  };
  ALTER TYPE default::Token {
      DROP PROPERTY metrics;
      ALTER PROPERTY name {
          DROP CONSTRAINT std::max_len_value(255);
      };
  };
  ALTER TYPE default::Token {
      ALTER PROPERTY updated_at {
          RENAME TO updatedAt;
      };
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY holderConcentration {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::TokenMetrics {
      DROP PROPERTY holders;
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY is_honeypot {
          RENAME TO bundlerActivity;
      };
      ALTER PROPERTY liquidityScore {
          SET default := (<std::decimal>0.0);
      };
      ALTER PROPERTY marketCapRisk {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::TokenMetrics {
      CREATE REQUIRED PROPERTY metadata: std::str {
          SET default := '{}';
      };
      ALTER PROPERTY priceVolatility {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY risk_score {
          RENAME TO accumulationRate;
      };
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY accumulationRate {
          SET default := (<std::decimal>0.0);
      };
      ALTER PROPERTY sellPressure {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::TokenMetrics {
      CREATE OPTIONAL PROPERTY stealthAccumulation: std::decimal {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::TokenMetrics {
      CREATE OPTIONAL PROPERTY suspiciousPattern: std::str;
  };
  ALTER TYPE default::TokenMetrics {
      DROP PROPERTY total_supply;
      ALTER PROPERTY volumeAnomaly {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::TokenPrices {
      DROP PROPERTY liquidity;
      ALTER PROPERTY marketCap {
          SET default := (<std::decimal>0.0);
      };
      ALTER PROPERTY price {
          SET default := (<std::decimal>0.0);
      };
      ALTER PROPERTY tokenAddress {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY volume_24h {
          SET default := (<std::decimal>0.0);
      };
  };
};
