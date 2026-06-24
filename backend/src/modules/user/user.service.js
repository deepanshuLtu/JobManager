import { User } from "./user.model.js";

export const findUserByEmail = (email, options = {}) => {
  const query = User.findOne({ email });

  if (options.includePassword) {
    query.select("+password");
  }

  return query;
};

export const findUserById = (id) => {
  return User.findById(id).select("-password");
};

export const createUser = (data) => {
  return User.create(data);
};

export const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const userObject = typeof user.toObject === "function" ? user.toObject() : { ...user };

  delete userObject.password;

  return userObject;
};
