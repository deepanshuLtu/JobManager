import api from "./api";

export const getCourses = () => {
  return api.get("/courses");
};

export const createCourse = (data) => {
  return api.post("/courses", data);
};

export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};