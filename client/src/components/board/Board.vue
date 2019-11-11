<template>
  <div class="board">
    <el-row type="flex">
      <el-col :span="24">
        <h1>
          Sprint {{sprint.number}}
        </h1>
        <el-button @click="startSprint"> Start New Sprint </el-button>
        <el-button @click="endSprint"> End Sprint </el-button>
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
import BoardColumn from "./BoardColumn.vue";
import NewTaskForm from "./NewTaskForm.vue";
import ProjectsAPI from "../../api/projects";

const STATUS_MAPPINGS = {
  "TO DO": "TO DO",
  "IN PROGRESS": "IN PROGRESS",
  "AWAITING FOR REVIEW": "IN REVIEW",
  TESTING: "TESTING",
  DONE: "DONE"
};

export default {
  name: "Board",
  components: { BoardColumn, NewTaskForm },
  data() {
    return {
      sprint: {},
      tasks: [],
      dialogVisible: false
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
        .endCurrentSprint(this.$store.state.currentProject.id)
        .then(response => console.log(response));
    },
    startSprint() {
      ProjectsAPI
        .startNewSprint(this.$store.state.currentProject.id)
        .then(response => console.log(response));
    }
  },
  mounted() {
    ProjectsAPI.getCurrentSprint(this.$store.state.currentProject.id).then((response) => {
      if (response.ok) {
        this.sprint = response.data.sprint;
        this.tasks = response.data.tasks;
      }
    });
  },
  computed: {
    getColumns() {
      return ["TO DO", "IN PROGRESS", "AWAITING FOR REVIEW", "TESTING", "DONE"].map(title => ({
        title,
        tasks: this.tasks[STATUS_MAPPINGS[title]]
      }));
    }
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
