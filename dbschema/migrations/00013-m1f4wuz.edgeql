CREATE MIGRATION m1f4wuzn7iisc2rxf3tl3sqszvlwjhhzmsbmsqavju5gqgn42gk66a
    ONTO m1jwtoy23cs62gc2z6gsx3nuv33gojaqwivb47z42kxg42ztx26k7q
{
  CREATE TYPE default::TrainingData {
      CREATE REQUIRED LINK metrics: default::TokenMetrics;
      CREATE REQUIRED LINK price: default::TokenPrices;
      CREATE REQUIRED LINK token: default::Token;
  };
};
