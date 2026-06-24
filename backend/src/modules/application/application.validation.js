import mongoose from "mongoose";

const allowedStatuses = ["Applied", "Shortlisted", "Selected", "Rejected"];

const sendValidationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

export const validateCreateApplication = (req, res, next) => {
  const { jobId, resumeLink, coverNote } = req.body;

  if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
    return sendValidationError(res, "Valid jobId is required");
  }

  if (!resumeLink || typeof resumeLink !== "string" || !resumeLink.trim()) {
    return sendValidationError(res, "resumeLink is required");
  }

  if (coverNote !== undefined && typeof coverNote !== "string") {
    return sendValidationError(res, "coverNote must be a string");
  }

  next();
};

export const validateApplicationStatusUpdate = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return sendValidationError(res, "Invalid application id");
  }

  if (!allowedStatuses.includes(req.body.status)) {
    return sendValidationError(
      res,
      "Status must be one of Applied, Shortlisted, Selected, or Rejected",
    );
  }

  next();
};
