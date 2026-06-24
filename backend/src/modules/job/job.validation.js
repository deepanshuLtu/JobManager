import mongoose from "mongoose";

const allowedJobTypes = ["Internship", "Job"];

const sendValidationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

const validateSkills = (skills) => {
  return Array.isArray(skills) && skills.every((skill) => typeof skill === "string");
};

const validateJobPayload = (req, res, next, { partial = false } = {}) => {
  const { title, description, skills, type, location, isActive } = req.body;

  if (!partial || title !== undefined) {
    if (!title || typeof title !== "string" || !title.trim()) {
      return sendValidationError(res, "Job title is required");
    }
  }

  if (!partial || description !== undefined) {
    if (!description || typeof description !== "string" || !description.trim()) {
      return sendValidationError(res, "Job description is required");
    }
  }

  if (skills !== undefined && !validateSkills(skills)) {
    return sendValidationError(res, "Skills must be an array of strings");
  }

  if (!partial || type !== undefined) {
    if (!allowedJobTypes.includes(type)) {
      return sendValidationError(res, "Job type must be either Internship or Job");
    }
  }

  if (!partial || location !== undefined) {
    if (!location || typeof location !== "string" || !location.trim()) {
      return sendValidationError(res, "Job location is required");
    }
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    return sendValidationError(res, "isActive must be a boolean value");
  }

  next();
};

export const validateCreateJob = (req, res, next) => {
  validateJobPayload(req, res, next);
};

export const validateUpdateJob = (req, res, next) => {
  validateJobPayload(req, res, next, { partial: true });
};

export const validateJobIdParam = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return sendValidationError(res, "Invalid job id");
  }

  next();
};
