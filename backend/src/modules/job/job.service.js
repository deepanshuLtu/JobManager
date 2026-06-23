import { Job } from "./job.model.js";

export const createJob = (data) => {
  return Job.create(data);
};

export const getJobs = (filters = {}) => {
  const query = {};

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.location) {
    query.location = {
      $regex: filters.location,
      $options: "i",
    };
  }

  if (filters.isActive !== undefined) {
    query.isActive = filters.isActive;
  }

  return Job.find(query).sort({ createdAt: -1 });
};

export const getJobById = (id) => {
  return Job.findById(id);
};

export const updateJob = (id, data) => {
  return Job.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteJob = (id) => {
  return Job.findByIdAndDelete(id);
};
