<template>
  <div class="board">
    <el-row type="flex">
      <el-col :span="24">
        <h1>
          Sprint {{sprint.number}}
        </h1>
        <!-- <el-button @click="startSprint"> Start New Sprint </el-button>
        <el-button @click="endSprint"> End Sprint </el-button> -->
        <avatars :users="users" :onSelect="onSelect" />
      </el-col>
    </el-row>
  <el-row type="flex" :gutter="10">
    <BoardColumn v-for="column in getColumns"
                  :key="column.title"
                  :title="column.title"
                  :tasks="column.tasks"
                  :openDialog="openDialog" > </BoardColumn>
  </el-row>
   <el-dialog :visible.sync="dialogVisible">
      <new-task-form :id="sprint.projectId" :sprintId="sprint.id" />
    </el-dialog>
  </div>
</template>

<script>
// import { Draggable, Container } from "vue-smooth-dnd";
import { mapGetters } from "vuex";

import BoardColumn from "./BoardColumn.vue";
import NewTaskForm from "./NewTaskForm.vue";
import Avatars from "../app/misc/Avatars.vue";
import ProjectsAPI from "../../api/projects";
import { sortTasks } from "../../utils";
import Socket from "../../api/websocket";

const STATUS_MAPPINGS = {
  "TO DO": "TO DO",
  "IN PROGRESS": "IN PROGRESS",
  "AWAITING FOR REVIEW": "IN REVIEW",
  TESTING: "TESTING",
  DONE: "DONE"
};

export default {
  name: "Board",
  components: { BoardColumn, NewTaskForm, Avatars },
  data() {
    return {
      sprint: {},
      tasks: [],
      users: [],
      dialogVisible: false,
      tasksFor: []
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    getUser() {
      this.$store.dispatch("getUser");
    },
    endSprint() {
      ProjectsAPI
        .endCurrentSprint(this.currentProject.id)
        .then(response => console.log(response));
    },
    startSprint() {
      ProjectsAPI
        .startNewSprint(this.currentProject.id)
        .then(response => console.log(response));
    },
    onSelect(selected) {
      console.log(selected);
      this.tasksFor = selected;
      // this.getSprint(this.tasksFor);
    },
    getSprint(forUsers) {
      ProjectsAPI.getCurrentSprint(this.currentProject.id, { users: forUsers }).then((response) => {
        if (response.ok) {
          this.sprint = response.data.sprint;
          this.tasks = response.data.tasks;
        }
      });
    },
    updateTask(taskId, task) {
      const index = this.tasks.findIndex(t => t.id === taskId);
      const newTasks = [...this.tasks];
      newTasks[index] = task;
      this.tasks = newTasks;
    },
    onSentToBacklog(taskId) {
      const index = this.tasks.findIndex(t => t.id === taskId);
      const newTasks = [...this.tasks.slice(0, index),
        ...this.tasks.slice(index + 1, this.tasks.length)];
      this.tasks = newTasks;
    }
  },
  mounted() {
    this.getSprint();
    ProjectsAPI.getUsers(this.currentProject.id, { short: true }).then((response) => {
      if (response.ok) {
        this.users = response.data.users;
      }
    });
    Socket.on("task updated", ({ taskId, task }) => {
      this.updateTask(taskId, task);
    });
    Socket.on("sent to backlog", ({ taskId }) => {
      this.onSentToBacklog(taskId);
    });
  },
  computed: {
    getColumns() {
      const tasksByUser = this.tasks.filter(task => this.tasksFor.includes(task.id));
      const sortedTasks = sortTasks(tasksByUser.length ? tasksByUser : this.tasks);

      return ["TO DO", "IN PROGRESS", "AWAITING FOR REVIEW", "TESTING", "DONE"].map(title => ({
        title,
        tasks: sortedTasks[STATUS_MAPPINGS[title]]
      }));
    },
    ...mapGetters(["currentProject"])
  },
};
</script>

<style lang="scss" scoped>
  .board {
    height: 100%;

    & h1 {
      font-size: 24px;
      margin-top: 0;
    }
  }
</style>
