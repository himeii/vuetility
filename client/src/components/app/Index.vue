<template>
  <app-project-list :projects="projects" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppProjectList from "./AppProjectList.vue";

export default {
  name: "Index",
  components: { AppProjectList },
  mounted() {
    this.getDashboardProjects();
  },
  methods: {
    ...mapActions(["getDashboardProjects"]),
  },
  computed: {
    ...mapGetters(["projects"])
  },
};
</script>

<style lang="scss" scoped>

</style>
