const sendValidationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return sendValidationError(res, "Name is required");
  }

  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    return sendValidationError(res, "Valid email is required");
  }

  if (!password || typeof password !== "string" || password.trim().length < 6) {
    return sendValidationError(res, "Password must be at least 6 characters long");
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    return sendValidationError(res, "Valid email is required");
  }

  if (!password || typeof password !== "string") {
    return sendValidationError(res, "Password is required");
  }

  next();
};
