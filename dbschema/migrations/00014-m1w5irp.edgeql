CREATE MIGRATION m1w5irpkexilh7d4psniy2y3cdisvt7tsvfqrcof5ojl7kl4446tfq
    ONTO m1f4wuzn7iisc2rxf3tl3sqszvlwjhhzmsbmsqavju5gqgn42gk66a
{
  ALTER TYPE default::Token {
      ALTER LINK price {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
