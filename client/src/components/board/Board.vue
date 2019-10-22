<template>
  <div class="board">
    <el-row type="flex">
      <el-col :span="24">
      <h1>
      {{sprint.name}}
      </h1>
      <span>{{ sprint.daysLeft }} days left</span>
      </el-col>
    </el-row>
  <el-row type="flex" :gutter="10">
    <BoardColumn v-for="column in columns"
                  :key="column.title"
                  :title="column.title"
                  :tasks="column.tasks"
                  :openDialog="openDialog" > </BoardColumn>
  </el-row>
   <el-dialog :visible.sync="dialogVisible">
      Some text
    </el-dialog>
  </div>
</template>

<script>
// import { Draggable, Container } from "vue-smooth-dnd";
import BoardColumn from "./BoardColumn.vue";

const columns = ["To Do", "In Progress", "Awaiting for review", "Testing", "Done"].map((title, index) => ({
  title,
  tasks: [{
    id: index,
    title: "Fix the thing"
  }]
}));


export default {
  name: "Board",
  components: { BoardColumn },
  data() {
    return {
      columns,
      sprint: {
        name: "Sprint 45",
        daysLeft: "2"
      },
      dialogVisible: false
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    }
  },
};
</script>

<style lang="sass" scoped>
  .board
    height: 100%;
</style>
