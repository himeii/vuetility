<template>
  <div>
    <h1>Project Participants</h1>
    <project-user v-for="user in users" :key="user.id" v-bind="user" />
  </div>
</template>

<script>
import ProjectUser from "./ProjectUser.vue";

export default {
  name: "ProjectUsers",
  props: ["users"],
  components: { ProjectUser }
};
</script>

<style lang="scss" scoped>

</style>
