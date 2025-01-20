CREATE MIGRATION m1sefxs7h4mowh3nhvryi2nfhz5yd67fxwhtqezftwpnr5eld77vja
    ONTO m1qg6j7yam6ivjoekarjh4f2mdvkqxt7hdssgv5vslecdvlah72s4a
{
  CREATE TYPE default::TokenRisk {
      CREATE REQUIRED PROPERTY concentration: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY highRiskCount: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY liquidity: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY lowRiskCount: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY mediumRiskCount: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY overall: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY social: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY technical: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY totalTokens: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY volatility: std::decimal {
          SET default := (<std::decimal>0.0);
      };
  };
  ALTER TYPE default::Token {
      CREATE REQUIRED LINK risk: default::TokenRisk {
          SET REQUIRED USING (INSERT
              default::TokenRisk
              {
                  overall := <std::decimal>0.0,
                  liquidity := <std::decimal>0.0,
                  concentration := <std::decimal>0.0,
                  volatility := <std::decimal>0.0,
                  social := <std::decimal>0.0,
                  technical := <std::decimal>0.0,
                  totalTokens := <std::decimal>0.0,
                  highRiskCount := <std::decimal>0.0,
                  mediumRiskCount := <std::decimal>0.0,
                  lowRiskCount := <std::decimal>0.0
              });
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
