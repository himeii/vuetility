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
  },
  computed: {
    ...mapGetters(["currentProject"])
  },
};
</script>
