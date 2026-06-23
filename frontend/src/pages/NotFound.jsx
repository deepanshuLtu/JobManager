import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="auth-wrapper">
      <div
        className="auth-box"
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "0.5rem",
          }}
        >
          404
        </h1>

        <p className="subtitle">The page you're looking for doesn't exist.</p>

        <Link to="/">
          <button className="btn btn-primary">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
