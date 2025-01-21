CREATE MIGRATION m1a2bqdjmqmz5yrmovh4zxsak2q3bufhzx2o7gfterp2lwqs37hlwa
    ONTO m1q4vboa4fluk74p6b2jq6c5hcf7kxdxhjq5so4dkfcws6sobs5ziq
{
  ALTER TYPE default::Token {
      CREATE REQUIRED PROPERTY chain: std::str {
          SET REQUIRED USING ('ethereum');
      };
  };
};
