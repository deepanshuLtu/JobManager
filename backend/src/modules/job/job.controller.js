import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "./job.service.js";

export const create = async (req, res) => {
  try {
    const job = await createJob(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  const jobs = await getJobs({
    type: req.query.type,
    location: req.query.location,
    isActive: true,
  });

  res.json({
    success: true,
    data: jobs,
  });
};

export const getAdminAll = async (req, res) => {
  const jobs = await getJobs({
    type: req.query.type,
    location: req.query.location,
  });

  res.json({
    success: true,
    data: jobs,
  });
};

export const getOne = async (req, res) => {
  const job = await getJobById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json({
    success: true,
    data: job,
  });
};

export const update = async (req, res) => {
  const job = await updateJob(req.params.id, req.body);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json({
    success: true,
    data: job,
  });
};

export const remove = async (req, res) => {
  const job = await deleteJob(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.json({
    success: true,
    message: "Job deleted successfully",
  });
};
