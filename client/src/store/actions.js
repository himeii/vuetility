import AuthAPI from "../api/auth";

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
  }
};
