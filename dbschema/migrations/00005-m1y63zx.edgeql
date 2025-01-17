CREATE MIGRATION m1y63zxno2oq6gbudu5xm5qw4yfujj4iflqb7naltwe4v2hx7zfjka
    ONTO m1y2sdi645fpmvhl5jerds2yz7wibcoywlkmsykawpmj5kmmhfi3dq
{
  ALTER TYPE default::TokenMetrics {
      CREATE REQUIRED PROPERTY currentPrice: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY holders: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY isHoneyPot: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY totalSupply: std::decimal {
          SET default := (<std::decimal>0.0);
      };
  };
};
