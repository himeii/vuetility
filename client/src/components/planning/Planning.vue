<template>
  <div>
    <div class="planning-top-bar">
    <h1 class="heading">Planning</h1>
    <el-button v-if="canBePlanned" @click="startNextSprint">Start Sprint</el-button>
    </div>
    <div v-if="canBePlanned">
    <h2>These tasks will be included in the next sprint</h2>
    Tasks from last sprint
    <div v-for="task in nextSprintTasks" :key="task.id"> {{ task.name }} </div>
    ---------
    <h2>Add tasks from product backlog to your next sprint</h2>
    <div v-for="task in backlogTasks" :key="task.id"> {{ task.name }} </div>
    </div>
    <div v-else>
      The sprint hasn't finished yet.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectsAPI from "../../api/projects";

export default {
  name: "Planning",
  methods: {
    startNextSprint() {
      const taskIds = this.nextSprintTasks.map(task => task.id);
      ProjectsAPI.startNewSprint(this.currentProject.id, taskIds);
    }
  },
  mounted() {
    ProjectsAPI.getUnfinishedTasks(this.currentProject.id).then((response) => {
      if (response.data.message) {
        this.canBePlanned = false;
      } else {
        this.canBePlanned = true;
        this.nextSprintTasks = response.data.tasks;
      }
    });
    ProjectsAPI.getBacklog(this.currentProject.id).then((response) => {
      this.backlogTasks = response.data.tasks;
    });
  },
  data() {
    return {
      nextSprintTasks: [],
      backlogTasks: [],
      canBePlanned: false
    };
  },
  computed: {
    ...mapGetters(["currentProject"])
  },
};
</script>

<style lang="scss" scoped>
  .planning-top-bar {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
  }
</style>
