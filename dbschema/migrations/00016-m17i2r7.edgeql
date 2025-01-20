CREATE MIGRATION m17i2r7qn5vx7imasw3t6l2lqfphl7siwfmjfqkeeh7rvchfoaigaq
    ONTO m1pewc7xjkrm3z33imygaceah4vsyhdmo7ek2xtvgtnsv755lx7luq
{
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY tokenAddress {
          DROP CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::TokenPrices {
      ALTER PROPERTY tokenAddress {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
