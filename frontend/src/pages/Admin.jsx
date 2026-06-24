import { useEffect, useState } from "react";
import {
  getAdminJobs,
  createJob,
  deleteJob,
  updateJob,
} from "../services/jobApi";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../services/applicationApi";
import EmptyState from "../components/EmptyState";

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    type: "Job",
    skills: "",
    isActive: true,
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAdminJobs();
      setJobs(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      setApplications(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const resetForm = () => {
    setEditingJobId(null);
    setFormData({
      title: "",
      location: "",
      description: "",
      type: "Job",
      skills: "",
      isActive: true,
    });
  };

  const handleEdit = (job) => {
    setEditingJobId(job._id);
    setFormData({
      title: job.title || "",
      location: job.location || "",
      description: job.description || "",
      type: job.type || "Job",
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
      isActive: job.isActive ?? true,
    });
  };

  const jobPayload = {
    title: formData.title,
    location: formData.location,
    description: formData.description,
    type: formData.type,
    skills: formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
    isActive: formData.isActive,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingJobId) {
        await updateJob(editingJobId, jobPayload);
        alert("Job Updated Successfully");
      } else {
        await createJob(jobPayload);
        alert("Job Created Successfully");
      }

      resetForm();

      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save job");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      fetchApplications();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage jobs and applications</p>
        </div>
      </div>

      <div className="container">
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2 className="section-title">
            {editingJobId ? "Update Job" : "Create Job"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Job Title</label>
              <input
                name="title"
                placeholder="Frontend Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Job Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="field">
              <label>Location</label>
              <input
                name="location"
                placeholder="Remote / Gurgaon"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Skills</label>
              <input
                name="skills"
                placeholder="React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Job description..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Active job posting
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              {editingJobId ? "Update Job" : "Create Job"}
            </button>

            {editingJobId && (
              <button
                type="button"
                className="btn"
                onClick={resetForm}
                style={{ marginLeft: "0.75rem" }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <h2 className="section-title">All Jobs</h2>

        {jobs.length === 0 ? (
          <EmptyState message="No jobs available." />
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="admin-row">
              <div>
                <h4>{job.title}</h4>
                <p>
                  {job.type} • {job.location} • {job.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="btn" onClick={() => handleEdit(job)}>
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: "3rem" }}>
          <h2 className="section-title">Applications</h2>

          {applications.length === 0 ? (
            <EmptyState message="No applications found." />
          ) : (
            applications.map((application) => (
              <div key={application._id} className="admin-row">
                <div>
                  <h4>{application.userId?.name || "Applicant"}</h4>

                  <p>
                    {application.jobId?.title || "Job"} • {application.status}
                  </p>

                  <small>{application.userId?.email}</small>
                </div>

                <select
                  value={application.status}
                  onChange={(e) =>
                    handleStatusChange(application._id, e.target.value)
                  }
                  style={{ width: "180px" }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
