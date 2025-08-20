import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const saltRound = parseInt(process.env.SALT_ROUND) || 10; // Convert to number, default to 10

export const hashPassword = async (password) => {
  try {
    if (!password) throw new Error("Password is required");
    if (!saltRound) throw new Error("Salt round is required");
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};
