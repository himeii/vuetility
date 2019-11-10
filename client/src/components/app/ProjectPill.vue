<template>
  <div @click="goToProject">
    {{ name }}
  </div>

</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProjectPill",
  props: ["name", "id"],
  methods: {
    ...mapActions(["setCurrentProject"]),
    goToProject() {
      this.setCurrentProject(this.id);
      this.$router.push(`/app/projects/${this.id}`);
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
