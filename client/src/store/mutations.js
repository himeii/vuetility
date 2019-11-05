import router from "../router";

export default {
  setUser(state, payload) {
    state.user = payload;
    state.isAuthenticated = true;
  },
  onLogout(state) {
    state.user = {};
    state.isAuthenticated = false;
    router.push("/");
  },
  getUser(state, payload) {
    console.log(payload);
  }
};
