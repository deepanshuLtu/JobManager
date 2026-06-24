import {
  createUser,
  findUserByEmail,
  sanitizeUser,
} from "../user/user.service.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    user: sanitizeUser(user),
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await findUserByEmail(normalizedEmail, {
    includePassword: true,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    user: sanitizeUser(user),
    token,
  };
};
