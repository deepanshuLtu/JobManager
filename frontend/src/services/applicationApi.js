import api from "./api";

export const applyForJob = (data) => {
  return api.post("/applications", data);
};

export const getMyApplications = () => {
  return api.get("/applications/me");
};

export const getAllApplications = () => {
  return api.get("/applications");
};

export const updateApplicationStatus = (id, status) => {
  return api.put(`/applications/${id}/status`, {
    status,
  });
};
