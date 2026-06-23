import { useEffect, useState } from "react";
import { getMyEnrollments } from "../services/enrollmentApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await getMyEnrollments();
      setEnrollments(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const totalCourses = enrollments.length;

  const averageProgress =
    totalCourses > 0
      ? Math.round(
          enrollments.reduce(
            (sum, enrollment) => sum + (enrollment.progress || 0),
            0,
          ) / totalCourses,
        )
      : 0;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>My Dashboard</h1>
          <p>Track your enrolled courses and progress</p>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Enrolled Courses</div>
            <div className="stat-value">{totalCourses}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Average Progress</div>
            <div className="stat-value">
              {averageProgress}
              <span className="stat-unit">%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Status</div>
            <div className="stat-value">
              {totalCourses > 0 ? "Active" : "New"}
            </div>
          </div>
        </div>

        <h2 className="section-title">My Courses</h2>

        {enrollments.length === 0 ? (
          <EmptyState message="You haven't enrolled in any courses yet." />
        ) : (
          enrollments.map((enrollment) => (
            <div key={enrollment._id} className="enroll-row">
              <div className="enroll-icon">📚</div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  {enrollment.course?.title || "Course"}
                </h4>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {enrollment.course?.category && (
                    <span className="badge badge-teal">
                      {enrollment.course.category}
                    </span>
                  )}

                  {enrollment.course?.difficulty && (
                    <span className="badge badge-gray">
                      {enrollment.course.difficulty}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${enrollment.progress || 0}%`,
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--gray-600)",
                    }}
                  >
                    {enrollment.progress || 0}% Complete
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/courses">
            <button className="btn btn-primary">Browse More Courses</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
