import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <div className="nav-links" style={{ gap: "1.5rem" }}>
        <Link to="/" className="nav-logo">
          EduLearn
        </Link>

        <Link to="/courses">Courses</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}

        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <span
              style={{
                fontSize: "14px",
                color: "var(--gray-600)",
              }}
            >
              Hi, {user.name}
            </span>

            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup">
              <button className="btn btn-primary">Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
