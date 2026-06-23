import {
  createApplication,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} from "./application.service.js";

export const apply = async (req, res) => {
  try {
    const application = await createApplication({
      userId: req.user._id,
      jobId: req.body.jobId,
      resumeLink: req.body.resumeLink,
      coverNote: req.body.coverNote,
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMine = async (req, res) => {
  const applications = await getMyApplications(req.user._id);

  res.json({
    success: true,
    data: applications,
  });
};

export const getAll = async (req, res) => {
  const applications = await getAllApplications({
    status: req.query.status,
  });

  res.json({
    success: true,
    data: applications,
  });
};

export const updateStatus = async (req, res) => {
  const application = await updateApplicationStatus(
    req.params.id,
    req.body.status,
  );

  res.json({
    success: true,
    data: application,
  });
};
