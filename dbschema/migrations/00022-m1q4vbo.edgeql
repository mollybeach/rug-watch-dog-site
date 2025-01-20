CREATE MIGRATION m1q4vboa4fluk74p6b2jq6c5hcf7kxdxhjq5so4dkfcws6sobs5ziq
    ONTO m1sefxs7h4mowh3nhvryi2nfhz5yd67fxwhtqezftwpnr5eld77vja
{
  ALTER TYPE default::TokenRisk {
      CREATE REQUIRED PROPERTY tokenAddress: std::str {
          SET REQUIRED USING (<std::str>'0x');
      };
  };
};
