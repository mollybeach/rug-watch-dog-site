CREATE MIGRATION m1o25orvkrvncjavy6zwromdzflirenlhkeibbogduphlnyutey46q
    ONTO m1a2bqdjmqmz5yrmovh4zxsak2q3bufhzx2o7gfterp2lwqs37hlwa
{
  ALTER TYPE default::Token {
      ALTER PROPERTY chain {
          SET default := 'ethereum';
      };
  };
};
