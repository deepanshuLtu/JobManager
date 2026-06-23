import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">🚀 Start Learning Today</div>

        <h1>Learn Anything, Anytime</h1>

        <p>
          Browse our curated courses and start your learning journey today.
          Learn at your own pace and build skills that matter.
        </p>

        <Link to="/courses">
          <button className="btn btn-primary">Browse Courses</button>
        </Link>
      </section>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Courses</div>
            <div className="stat-value">100+</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Students</div>
            <div className="stat-value">1000+</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Categories</div>
            <div className="stat-value">20+</div>
          </div>
        </div>

        <h2 className="section-title">Why Choose EduLearn?</h2>

        <div className="card-grid">
          <div className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>Expert Instructors</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Learn from experienced professionals and industry experts.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>Flexible Learning</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Access courses anytime and learn at your own pace.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "0.5rem" }}>Career Growth</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Gain practical skills that help you advance your career.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
