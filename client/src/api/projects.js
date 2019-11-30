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
  getCurrentSprint: (id, query) => ProjectsAPI.get(`/${id}/currentSprint`, { params: query }),
  createTask: (id, sprintId, task) => ProjectsAPI.post(`/${id}/sprints/${sprintId}/tasks`, task),
  updateTaskStatus: (id, taskId, status) => ProjectsAPI.patch(`/${id}/tasks/${taskId}`, { status }),
  updateTask: (id, taskId, body) => ProjectsAPI.patch(`/${id}/tasks/${taskId}`, body),
  sendToBacklog: (id, taskId) => ProjectsAPI.get(`/${id}/tasks/${taskId}/toBacklog`),
  takeTask: (id, taskId) => ProjectsAPI.get(`/${id}/tasks/${taskId}/take`),
  endCurrentSprint: id => ProjectsAPI.get(`/${id}/sprints/endCurrentSprint`),
  startNewSprint: (id, tasks) => ProjectsAPI.post(`/${id}/sprints/startNewSprint`, { tasks }),
  getBacklog: id => ProjectsAPI.get(`/${id}/backlog`),
  getUsers: (id, query) => ProjectsAPI.get(`/${id}/users`, { params: query }),
  getTask: (id, taskId) => ProjectsAPI.get(`/${id}/tasks/${taskId}`),
  inviteUser: (id, email) => ProjectsAPI.post(`/${id}/invite`, { email }),
  getUnfinishedTasks: id => ProjectsAPI.get(`/${id}/planning`)
};

export default Projects;
