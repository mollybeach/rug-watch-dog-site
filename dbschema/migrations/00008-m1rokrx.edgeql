CREATE MIGRATION m1rokrx644m3rqb3qz6yd2vniwyez3osfzbmgn46liefyl5gied7wq
    ONTO m1gbgfsgwgrhehbarkg3ea66sjkwlhoirs55xa5fmmap46brlb5ynq
{
  ALTER TYPE default::TokenPrices {
      CREATE REQUIRED PROPERTY liquidity: std::decimal {
          SET default := (<std::decimal>0.0);
      };
  };
};
