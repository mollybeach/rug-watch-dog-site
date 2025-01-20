CREATE MIGRATION m16cgm6h76i3w7njopewotl4yioumfyghoo7ztc77edj4zjrvg35wa
    ONTO m1yt24ddihmafrgzmjbcwduy34osq7zw6di4el4rjaqqly62pw3bja
{
  CREATE TYPE default::TrainingData {
      CREATE REQUIRED LINK metrics: default::TokenMetrics;
      CREATE REQUIRED LINK price: default::TokenPrices;
      CREATE REQUIRED LINK token: default::Token;
  };
};
