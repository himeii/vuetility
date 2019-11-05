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
    isAuthenticated: false
  },
  mutations,
  actions,
  plugins: [vuexPersist.plugin],
  strict: true
});
