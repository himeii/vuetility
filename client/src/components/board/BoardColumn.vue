<template>
  <el-col :span="5">
    <div class="board-column-header">
      {{ title }}
    </div>
        <div :class="listClass">
          <Container group-name="list"
           @drop="onDrop(title, $event)"
           :get-child-payload="getChildPayload">
              <Draggable v-for="task in tasksTest" :key="task.id">
                <board-task v-bind="task"></board-task>
              </Draggable>
          </Container>
          <AddNewTask :openDialog="openDialog" :key="title" :column="title" />
        </div>
  </el-col>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import AddNewTask from "./AddNewTask.vue";
import BoardTask from "./BoardTask.vue";

export default {
  name: "BoardColumn",
  props: ["title", "tasks", "openDialog"],
  components: {
    BoardTask, Container, Draggable, AddNewTask
  },
  data() {
    return {
      tasksTest: Array(10).fill(1).map((i, index) => ({
        id: index,
        title: `Fix the thing${index}`,
        assignee: {
          name: "Sergey Breus"
        },
        time: {
          estimate: 2,
          tracked: 1
        }
      }))
    };
  },
  methods: {
    onDrop(column, dropResult, b) {
      console.log(column, dropResult, b);
    },
    getChildPayload(index) {
      console.log(index);
      return this.tasksTest[index];
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
