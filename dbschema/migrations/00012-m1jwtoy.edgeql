CREATE MIGRATION m1jwtoy23cs62gc2z6gsx3nuv33gojaqwivb47z42kxg42ztx26k7q
    ONTO m1o4ro4grkjw3jm7zzhoepfotqy7utfcyxvmaixaxl56deip47pq5a
{
  ALTER TYPE default::Token {
      ALTER LINK metrics {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER LINK price {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
