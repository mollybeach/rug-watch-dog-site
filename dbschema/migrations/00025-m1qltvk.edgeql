CREATE MIGRATION m1qltvk7v7oigqtqkhcxorpds63ki2ylq4t6nwifd6zq4g33ip4p2a
    ONTO m1o25orvkrvncjavy6zwromdzflirenlhkeibbogduphlnyutey46q
{
  ALTER TYPE default::TokenRisk {
      CREATE REQUIRED PROPERTY age: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY transactionsCount: std::decimal {
          SET default := (<std::decimal>0.0);
      };
  };
};
