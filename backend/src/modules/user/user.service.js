import { User } from "./user.model.js";

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const findUserById = (id) => {
  return User.findById(id).select("-password");
};

export const createUser = (data) => {
  return User.create(data);
};
