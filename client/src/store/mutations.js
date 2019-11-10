export default {
  setUser(state, payload) {
    state.user = payload;
    state.isAuthenticated = true;
  },
  onLogout(state) {
    state.user = {};
    state.isAuthenticated = false;
    // router.push("/");
  },
  getUser(state, payload) {
    console.log(payload);
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
  newProject(state, payload) {
    state.currentProject = payload;
  },
  setCurrentProject(state, payload) {
    state.currentProject = payload;
  },
  clearCurrentProject(state) {
    state.currentProject = null;
  }
};
