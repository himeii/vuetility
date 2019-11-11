<template>
  <div>
    Backlog
  </div>
</template>

<script>
import ProjectsAPI from "../../api/projects";

export default {
  name: "Backlog",
  mounted() {
    ProjectsAPI.getBacklog(this.$store.state.currentProject.id);
  },
};
</script>
