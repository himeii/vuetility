<template>
  <el-col :span="5">
    <div class="board-column-header">
      {{ title }}
    </div>
        <div :class="listClass">
          <Container group-name="list"
           @drop="onDrop(title, $event)"
           :get-child-payload="getChildPayload">
              <Draggable v-for="task in tasks" :key="task.id">
                <board-task v-bind="task"></board-task>
              </Draggable>
          </Container>
          <AddNewTask :openDialog="openDialog" :key="title" :column="title" />
        </div>
  </el-col>
</template>

<script>
import { mapGetters } from "vuex";
import { Container, Draggable } from "vue-smooth-dnd";
import AddNewTask from "./AddNewTask.vue";
import BoardTask from "./BoardTask.vue";
import ProjectsAPI from "../../api/projects";

const STATUS_MAPPINGS = {
  "TO DO": "TO DO",
  "IN PROGRESS": "IN PROGRESS",
  "AWAITING FOR REVIEW": "IN REVIEW",
  TESTING: "TESTING",
  DONE: "DONE"
};

export default {
  name: "BoardColumn",
  props: ["title", "tasks", "openDialog"],
  components: {
    BoardTask, Container, Draggable, AddNewTask
  },

  methods: {
    ...mapGetters(["currentProject"]),
    onDrop(status, dropResult) {
      console.log(status, dropResult);
      const { removedIndex, addedIndex, payload } = dropResult;
      if (typeof removedIndex === "number") {
        console.log("FROM ", status);
      } else if (typeof addedIndex === "number") {
        console.log("TO ", status);
        const projectId = this.currentProject().id;
        ProjectsAPI.updateTaskStatus(projectId, payload.id, STATUS_MAPPINGS[status]);
      }
    },
    getChildPayload(index) {
      console.log(index);
      return this.tasks[index];
    }
  },
  computed: {
    listClass() {
      return `board-column-task-list ${this.title}`;
    }
  },
};
</script>

<style lang="sass" scoped>
  .board-column-header
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 14px;
    line-height: 16px;
    vertical-align: center;

  .board-column-task-list
    background-color: #f5f5f5;
    margin-top: 8px;
    padding: 8px;
    border-radius: 4px;
    height: 100%;

    & > *
      margin-bottom: 4px;
</style>
