import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Available Jobs</h1>
          <p>Browse job opportunities and apply with one click.</p>
        </div>
      </div>

      <div className="container">
        {jobs.length === 0 ? (
          <EmptyState message="No jobs available yet." />
        ) : (
          <>
            <div
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <span className="badge badge-teal">
                {jobs.length} Jobs Available
              </span>
            </div>

            <div className="card-grid">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Jobs;
