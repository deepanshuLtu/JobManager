import { useEffect, useState } from "react";
import { getCourses, createCourse, deleteCourse } from "../services/courseApi";

const Admin = () => {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    difficulty: "Beginner",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await getCourses();
    setCourses(response.data.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCourse(formData);

      alert("Course Created");

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        difficulty: "Beginner",
      });

      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Creation Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Create and manage courses</p>
        </div>
      </div>

      <div className="container">
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2 className="section-title">Create Course</h2>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Course Title</label>
              <input
                name="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="field">
              <label>Category</label>
              <input
                name="category"
                placeholder="Web Development, AI, etc."
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder="0 for free course"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Create Course
            </button>
          </form>
        </div>

        <h2 className="section-title">All Courses</h2>

        {courses.length === 0 ? (
          <div className="empty-state">
            <p>No courses available.</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="admin-row">
              <div>
                <h4>{course.title}</h4>
                <p>
                  {course.category} • {course.difficulty}
                </p>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Admin;
