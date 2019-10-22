import Vue from "vue";
import ElementUI from "element-ui";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vmodal from "vue-js-modal";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";

library.add(faPlus);

Vue.component("fa", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(vmodal);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
