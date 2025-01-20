CREATE MIGRATION m1uteaz74vmxaoxzrxe44n7zmeex5hcsznldj327qvomdc43kl7dqa
    ONTO m1pkwpyj3zis6rmwl65olst2kxxql3zhgviosenwjcm67on56xhr5a
{
  CREATE TYPE default::Reason {
      CREATE REQUIRED PROPERTY reason: std::str;
  };
  ALTER TYPE default::TokenMetrics {
      DROP PROPERTY suspiciousPattern;
  };
};
