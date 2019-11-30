<template>
  <el-col class="board-column" :span="5">
    <div>
      <div class="board-column-header">
        {{ title.toLowerCase() }}
      </div>
      <div :class="listClass">
        <Container group-name="list"
        @drop="onDrop(title, $event)"
        :get-child-payload="getChildPayload">
            <Draggable v-for="task in tasks" :key="task.id">
              <board-task v-bind="task" :user="users.find(user => user.id === task.assigneeId)" />
            </Draggable>
        </Container>
        <AddNewTask :openDialog="openDialog" :key="title" :column="title" />
      </div>
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
  props: ["title", "tasks", "openDialog", "users"],
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

<style lang="scss" scoped>

  .board-column {
    padding: 8px;

    & > div {
      // background-color: #f1f5fd;
      border: 1px solid #EBEEF5;
      border-radius: 12px;
    }
  }

  .board-column-header {
    padding: 16px;
    border-radius: 4px;
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 600;
    line-height: 18px;
    vertical-align: center;
  }

  .board-column-task-list {
    margin-top: 8px;
    padding: 16px;
    border-radius: 4px;
    height: 100%;
    & > .smooth-dnd-draggable-wrapper {
      margin-bottom: 8px;
    }
  }

</style>
