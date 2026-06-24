import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyForJob } from "../services/applicationApi";
import { useAuth } from "../hooks/useAuth";

const JobCard = ({ job }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumeLink, setResumeLink] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setShowApplyForm((prev) => !prev);
  };

  const handleSubmitApplication = async () => {
    if (!resumeLink.trim()) {
      alert("Please add your resume link before applying.");
      return;
    }

    try {
      setSubmitting(true);

      await applyForJob({
        jobId: job._id,
        resumeLink: resumeLink.trim(),
        coverNote: coverNote.trim(),
      });

      alert("Application submitted successfully!");
      setResumeLink("");
      setCoverNote("");
      setShowApplyForm(false);
    } catch (error) {
      alert(error.response?.data?.message || "Application failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "var(--gray-900)",
          }}
        >
          {job.title}
        </h3>

        <span className="badge badge-teal">{job.location || "Remote"}</span>
      </div>

      <p
        style={{
          color: "var(--gray-600)",
          fontSize: "14px",
          marginBottom: "1rem",
        }}
      >
        {job.description}
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span className="badge badge-gray">{job.type}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <span className="badge badge-green">Open Position</span>

        <button className="btn btn-primary" onClick={handleApply}>
          {showApplyForm ? "Close" : "Apply Now"}
        </button>
      </div>

      {showApplyForm && (
        <div style={{ marginTop: "1rem" }}>
          <div className="field">
            <label>Resume Link</label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Cover Note</label>
            <textarea
              rows="3"
              placeholder="Optional message to the recruiter"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSubmitApplication}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
