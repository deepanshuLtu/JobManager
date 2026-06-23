import { Application } from "./application.model.js";

export const createApplication = async (data) => {
  const existing = await Application.findOne({
    userId: data.userId,
    jobId: data.jobId,
  });

  if (existing) {
    throw new Error("You have already applied for this job");
  }

  return Application.create(data);
};

export const getMyApplications = (userId) => {
  return Application.find({
    userId,
  })
    .populate("jobId")
    .sort({ appliedAt: -1 });
};

export const getAllApplications = (filters = {}) => {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  let applicationsQuery = Application.find(query)
    .populate("userId", "name email")
    .populate("jobId")
    .sort({ appliedAt: -1 });

  return applicationsQuery;
};

export const updateApplicationStatus = (applicationId, status) => {
  return Application.findByIdAndUpdate(
    applicationId,
    { status },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("userId", "name email")
    .populate("jobId");
};
