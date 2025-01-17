CREATE MIGRATION m1yt24ddihmafrgzmjbcwduy34osq7zw6di4el4rjaqqly62pw3bja
    ONTO m1rokrx644m3rqb3qz6yd2vniwyez3osfzbmgn46liefyl5gied7wq
{
  ALTER TYPE default::TokenMetrics {
      ALTER PROPERTY tokenAddress {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
