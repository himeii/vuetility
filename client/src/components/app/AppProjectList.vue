<template>
    <div class="project-list" v-if="!!projects.length">
      <div class="projects">
        <project-pill v-for="project in projects" :key="project.id" v-bind="project" />
      </div>
      <div>
      <create-new-project />
    </div>
    </div>
    <div class="add-new-project" v-else>
      <create-new-project />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import CreateNewProject from "./CreateNewProject.vue";
import ProjectPill from "./ProjectPill.vue";

export default {
  name: "ProjectList",
  props: ["projects"],
  components: { CreateNewProject, ProjectPill },
  updated() {
    console.log(this.projects);
  },
  mounted() {
    this.clearCurrentProject();
  },
  methods: {
    ...mapMutations(["clearCurrentProject"])
  },
};
</script>

<style lang="scss" scoped>

</style>
