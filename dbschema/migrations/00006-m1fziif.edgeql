CREATE MIGRATION m1fziifnwjqtttud2tj5evjgpz4nktpqc2im3lu7ydnap2tq76sscq
    ONTO m1y63zxno2oq6gbudu5xm5qw4yfujj4iflqb7naltwe4v2hx7zfjka
{
  ALTER TYPE default::Token {
      CREATE REQUIRED LINK metrics: default::TokenMetrics {
          SET REQUIRED USING (<default::TokenMetrics>{});
      };
      CREATE REQUIRED LINK price: default::TokenPrices {
          SET REQUIRED USING (<default::TokenPrices>{});
      };
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY currentPrice {
          RENAME TO currentPrice;
      };
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY isHoneyPot {
          RENAME TO isHoneyPot;
      };
      ALTER PROPERTY stealthAccumulation {
          SET REQUIRED USING (<std::decimal>{});
      };
      ALTER PROPERTY suspiciousPattern {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY totalSupply {
          RENAME TO totalSupply;
      };
  };
  ALTER TYPE default::TokenPrices {
      ALTER PROPERTY volume_24h {
          RENAME TO volume24h;
      };
  };
};
