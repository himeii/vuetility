<template>
  <div class="planning">
    <div class="planning-top-bar">
    <h1 class="heading">Planning</h1>
    <el-button v-if="canBePlanned" @click="startNextSprint">Start Sprint</el-button>
    </div>
    <div v-if="canBePlanned">
    <h2>These tasks will be included in the next sprint</h2>
    <planning-task v-for="task in nextSprintTasks" :key="task.id" v-bind="task" :assignee="users.find(user => user.id === task.assigneeId)" />

    <h2>Add tasks from product backlog to your next sprint</h2>
    <planning-task v-for="task in backlogTasks" :key="task.id" v-bind="task" :assignee="users.find(user => user.id === task.assigneeId)" />
    </div>
    <div v-else>
      The sprint hasn't finished yet.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectsAPI from "../../api/projects";
import PlanningTask from "./PlanningTask.vue";

export default {
  name: "Planning",
  components: { PlanningTask },
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
        this.nextSprintTasks = response.data.tasks
          .map(task => ({ ...task, fromPreviousSprint: true }));
      }
    });
    ProjectsAPI.getBacklog(this.currentProject.id).then((response) => {
      this.backlogTasks = response.data.tasks;
    });
    ProjectsAPI.getUsers(this.currentProject.id).then((response) => {
      this.users = response.data.users;
    });
  },
  data() {
    return {
      nextSprintTasks: [],
      backlogTasks: [],
      canBePlanned: false,
      users: []
    };
  },
  computed: {
    ...mapGetters(["currentProject"])
  },
};
</script>

<style lang="scss" scoped>
  .planning {
    max-width: 1000px;
  }

  .planning-top-bar {
    display: flex;
    justify-content: space-between;
  }
</style>
