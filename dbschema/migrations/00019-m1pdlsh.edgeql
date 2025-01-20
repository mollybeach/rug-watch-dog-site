CREATE MIGRATION m1pdlsh2arva6jdeqmmrgyrompbcdmw2j35yad5ohkr4jhreujp26a
    ONTO m1uteaz74vmxaoxzrxe44n7zmeex5hcsznldj327qvomdc43kl7dqa
{
  ALTER TYPE default::TokenMetrics {
      CREATE REQUIRED PROPERTY suspiciousPattern: std::bool {
          SET default := false;
      };
  };
};
