import Vue from "vue";
import ElementUI from "element-ui";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus, faUser, faHome, faTasks
} from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vmodal from "vue-js-modal";
import vSelect from "vue-multiselect";
import Avatar from "vue-avatar";
// import { VueContext } from "vue-context";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "element-ui/lib/theme-chalk/index.css";

library.add(faPlus, faUser, faHome, faTasks, faCommentAlt);


Vue.component("fa", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(vmodal);
Vue.component("v-select", vSelect);
Vue.component("avatar", Avatar);
// Vue.component("vue-context", VueContext);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
