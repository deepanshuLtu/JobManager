import { enrollCourse } from "../services/enrollmentApi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await enrollCourse(course._id);
      alert("Enrolled Successfully! Check your dashboard.");
    } catch (error) {
      alert(error.response?.data?.message || "Enrollment Failed");
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
          {course.title}
        </h3>

        <span className="badge badge-teal">{course.category}</span>
      </div>

      <p
        style={{
          color: "var(--gray-600)",
          fontSize: "14px",
          marginBottom: "1rem",
        }}
      >
        {course.description}
      </p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span className="badge badge-gray">{course.difficulty}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <span className="price">
          {course.price === 0 ? "Free" : `₹${course.price}`}
        </span>

        <button className="btn btn-primary" onClick={handleEnroll}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
