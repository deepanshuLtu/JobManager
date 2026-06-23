import api from "./api";

export const enrollCourse = (courseId) => {
  return api.post("/enrollments", {
    courseId,
  });
};

export const getMyEnrollments = () => {
  return api.get("/enrollments/me");
};
