import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getMyApplications();
      setApplications(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (app) => app.status === "Applied",
  ).length;

  const shortlistedCount = applications.filter(
    (app) => app.status === "Shortlisted",
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected",
  ).length;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>My Applications</h1>
          <p>Track your job applications and hiring progress</p>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Applications</div>
            <div className="stat-value">{totalApplications}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Shortlisted</div>
            <div className="stat-value">{shortlistedCount}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Selected</div>
            <div className="stat-value">{selectedCount}</div>
          </div>
        </div>

        <h2 className="section-title">My Job Applications</h2>

        {applications.length === 0 ? (
          <EmptyState message="You haven't applied for any jobs yet." />
        ) : (
          applications.map((application) => (
            <div key={application._id} className="enroll-row">
              <div className="enroll-icon">💼</div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  {application.jobId?.title || "Job"}
                </h4>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {application.jobId?.type && (
                    <span className="badge badge-teal">{application.jobId.type}</span>
                  )}

                  {application.jobId?.location && (
                    <span className="badge badge-gray">
                      {application.jobId.location}
                    </span>
                  )}

                  <span className="badge badge-green">
                    {application.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/jobs">
            <button className="btn btn-primary">Browse More Jobs</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
