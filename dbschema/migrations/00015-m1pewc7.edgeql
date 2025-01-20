CREATE MIGRATION m1pewc7xjkrm3z33imygaceah4vsyhdmo7ek2xtvgtnsv755lx7luq
    ONTO m1w5irpkexilh7d4psniy2y3cdisvt7tsvfqrcof5ojl7kl4446tfq
{
  ALTER TYPE default::Token {
      ALTER LINK price {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  DROP TYPE default::TrainingData;
};
