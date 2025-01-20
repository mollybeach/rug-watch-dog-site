CREATE MIGRATION m1gbgfsgwgrhehbarkg3ea66sjkwlhoirs55xa5fmmap46brlb5ynq
    ONTO m1fziifnwjqtttud2tj5evjgpz4nktpqc2im3lu7ydnap2tq76sscq
{
  CREATE TYPE default::ReasonMessage {
      CREATE REQUIRED PROPERTY condition: std::bool;
      CREATE REQUIRED PROPERTY message: std::str;
  };
};
