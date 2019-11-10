import Axios from "axios";

const ProjectsAPI = Axios.create({
  baseURL: "http://localhost:3001/api/projects",
  withCredentials: true
});

ProjectsAPI.interceptors.response.use((response) => {
  const transformed = { ...response };
  if (transformed.status < 400) {
    transformed.ok = true;
  }
  return transformed;
});

const Projects = {
  createProject: name => ProjectsAPI.post("/", { name }),
  getProjectByID: id => ProjectsAPI.get(`/${id}`),
  getCurrentSprint: id => ProjectsAPI.get(`/${id}/currentSprint`),
  createTask: (id, sprintId, task) => ProjectsAPI.post(`/${id}/sprints/${sprintId}/tasks`, task),
  updateTask: (id, taskId, status) => ProjectsAPI.patch(`/${id}/tasks/${taskId}`, { status })
};

export default Projects;
