<template>
  <div>
    Create here
    <el-input type="text" v-model="projectName" placeholder="Project name" />
    <el-button @click="createProject(projectName)">Create</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreateNewProject",
  data() {
    return {
      projectName: ""
    };
  },
  methods: {
    ...mapActions(["createProject"])
  },
};
</script>

<style lang="scss" scoped>

</style>
