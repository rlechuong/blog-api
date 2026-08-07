import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plaintext: string) => {
  const passwordHash = await bcrypt.hash(plaintext, saltRounds);
  return passwordHash;
};

const comparePassword = async (plaintext: string, hash: string) => {
  const match = await bcrypt.compare(plaintext, hash);
  return match;
};

export { hashPassword, comparePassword };
