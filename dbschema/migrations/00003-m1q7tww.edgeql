CREATE MIGRATION m1q7tww7wg7bk56vuh43h73dr7z5i4xjmu753d242gno7ylkxjtvwq
    ONTO m1mvvnnmj3daoiwkgvsy6r5rpnrocqbjcfrrv3gokrbvise6ttkeqa
{
  ALTER TYPE default::TokenMetrics {
      DROP PROPERTY isRugPull;
  };
};
