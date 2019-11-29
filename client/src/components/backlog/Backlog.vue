<template>
  <div>
    <h1>Backlog</h1>
    <backlog-task v-for="task in tasks" :key="task.id" v-bind="task" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectsAPI from "../../api/projects";
import BacklogTask from "./BacklogTask.vue";
import socket from "../../api/websocket";

export default {
  name: "Backlog",
  components: { BacklogTask },
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    ProjectsAPI.getBacklog(this.currentProject.id).then((response) => {
      if (response.ok) {
        this.tasks = response.data.tasks;
      }
    });

    socket.on("task taken", ({ taskId }) => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });

    socket.on("sent to backlog", ({ taskId }) => {
      ProjectsAPI.getTask(this.currentProject.id, taskId).then((response) => {
        if (response.ok) {
          this.tasks = [...this.tasks, response.data];
        }
      });
    });
  },
  computed: {
    ...mapGetters(["currentProject"])
  },
};
</script>
