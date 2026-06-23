import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data.data);
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
          <h1>All Courses</h1>
          <p>Explore our collection of courses and start learning today.</p>
        </div>
      </div>

      <div className="container">
        {courses.length === 0 ? (
          <EmptyState message="No courses available yet." />
        ) : (
          <>
            <div
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <span className="badge badge-teal">
                {courses.length} Courses Available
              </span>
            </div>

            <div className="card-grid">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Courses;
