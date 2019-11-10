import AuthAPI from "../api/auth";
import ProjectAPI from "../api/projects";

export default {
  async login({ commit }, data) {
    const response = await AuthAPI.login(data);
    console.log(response);
    if (response.ok) {
      commit("setUser", response.data.user);
    }
  },
  async register({ commit }, data) {
    const response = await AuthAPI.register(data);
    if (response.ok) {
      commit("setUser", response.data.user);
    }
  },
  async logout({ commit }) {
    const response = await AuthAPI.logout();
    console.log(response);
    if (response.ok) {
      commit("onLogout");
    }
  },
  async getUser({ commit }) {
    const response = await AuthAPI.getUser();
    commit("getUser", response);
  },
  async getDashboardProjects({ commit }) {
    const response = await AuthAPI.getDashboardProjects();
    console.log(response, "dashboard");
    if (response.ok) {
      commit("setProjects", response.data);
    }
  },
  async createProject({ commit }, name) {
    const response = await ProjectAPI.createProject(name);
    console.log(response, "project");
    if (response.ok) {
      commit("newProject", response.data);
    }
  },
  async setCurrentProject({ commit }, id) {
    const response = await ProjectAPI.getProjectByID(id);
    if (response.ok) {
      commit("setCurrentProject", response.data);
    }
  }
};
