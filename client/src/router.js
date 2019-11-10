import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFoundPage from "./views/NotFoundPage.vue";
import Project from "./views/Project.vue";
import Board from "./components/board/Board.vue";
import Backlog from "./components/backlog/Backlog.vue";
import Planning from "./components/planning/Planning.vue";
import Register from "./views/Register.vue";
import Application from "./views/Application.vue";
import Index from "./components/app/Index.vue";
// import store from "./store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/app",
      component: Application,
      props: route => ({ collapsed: route.fullPath !== "/app" }),
      children: [
        {
          name: "appIndex", path: "/", component: Index, props: { }
        },
        {
          path: "projects/:id",
          name: "project",
          component: Project,
          redirect: "projects/:id/board",
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
      ]
    },

    {
      path: "*",
      name: "not-found",
      component: NotFoundPage,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.path.startsWith("/app")) {
//     if (store.state.isAutheticated) {
//       next();
//     } else next("/");
//   } else next();
// });

export default router;
