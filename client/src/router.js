import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFoundPage from "./views/NotFoundPage.vue";
import Dashboard from "./views/Dashboard.vue";
import Board from "./components/board/Board.vue";
import Backlog from "./components/backlog/Backlog.vue";
import Planning from "./components/planning/Planning.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "planning",
          name: "planning",
          component: Planning
        },
        {
          path: "backlog",
          name: "backlog",
          component: Backlog
        },
        {
          path: "board",
          name: "board",
          component: Board
        },
      ]
    },
    {
      path: "*",
      name: "not-found",
      component: NotFoundPage,
    },
  ],
});
