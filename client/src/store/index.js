import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import mutations from "./mutations";
import actions from "./actions";

const vuexPersist = new VuexPersist({
  storage: window.localStorage,
});


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {},
    projects: [],
    currentProject: {}
  },
  mutations,
  actions,
  plugins: [vuexPersist.plugin],
  strict: true,
  getters: {
    username: (state) => {
      const { user } = state;
      return `${user.firstName} ${user.lastName}`;
    },
    projects: state => state.projects,
    currentProject: state => state.currentProject
  }
});
