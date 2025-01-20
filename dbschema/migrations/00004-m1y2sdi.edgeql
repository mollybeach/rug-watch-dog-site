CREATE MIGRATION m1y2sdi645fpmvhl5jerds2yz7wibcoywlkmsykawpmj5kmmhfi3dq
    ONTO m1q7tww7wg7bk56vuh43h73dr7z5i4xjmu753d242gno7ylkxjtvwq
{
  ALTER TYPE default::TokenMetrics {
      CREATE REQUIRED PROPERTY isRugPull: std::bool {
          SET default := false;
      };
  };
};
