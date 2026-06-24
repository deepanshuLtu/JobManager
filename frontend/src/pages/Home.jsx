import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">💼 Find Your Dream Job</div>

        <h1>Track Jobs. Apply Faster. Get Hired.</h1>

        <p>
          Explore job opportunities, submit applications, and manage your career
          journey from one simple platform.
        </p>

        <Link to="/jobs">
          <button className="btn btn-primary">Browse Jobs</button>
        </Link>
      </section>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Jobs Posted</div>
            <div className="stat-value">100+</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Companies</div>
            <div className="stat-value">50+</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Applications</div>
            <div className="stat-value">1000+</div>
          </div>
        </div>

        <h2 className="section-title">Why Choose JobTracker?</h2>

        <div className="card-grid">
          <div className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>Browse Opportunities</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Discover job openings from various companies and industries.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>Easy Applications</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Apply to jobs quickly and manage all applications in one place.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>Track Progress</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Stay updated with your application status and hiring progress.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
