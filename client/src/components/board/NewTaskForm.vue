<template>
  <div>
    <el-input v-model="newTaskData.name" placeholder="Name" />
    <el-input v-model="newTaskData.description" placeholder="Description" />
    <el-button @click="createTask">Create</el-button>
  </div>
</template>

<script>
import ProjectsAPI from "../../api/projects";

export default {
  name: "NewTaskForm",
  props: ["id", "sprintId"],
  data() {
    return {
      newTaskData: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    createTask() {
      ProjectsAPI.createTask(this.id, this.sprintId, this.newTaskData)
        .then(response => console.log(response));
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
