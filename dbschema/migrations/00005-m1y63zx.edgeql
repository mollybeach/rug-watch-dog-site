CREATE MIGRATION m1y63zxno2oq6gbudu5xm5qw4yfujj4iflqb7naltwe4v2hx7zfjka
    ONTO m1y2sdi645fpmvhl5jerds2yz7wibcoywlkmsykawpmj5kmmhfi3dq
{
  ALTER TYPE default::TokenMetrics {
      CREATE REQUIRED PROPERTY current_price: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY holders: std::decimal {
          SET default := (<std::decimal>0.0);
      };
      CREATE REQUIRED PROPERTY is_honeypot: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY total_supply: std::decimal {
          SET default := (<std::decimal>0.0);
      };
  };
};
