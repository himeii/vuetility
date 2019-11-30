<template>
  <div class="board-task">
    <div @click="openDialog" @contextmenu.prevent="$refs.menu.open($event, id)">
    <el-card class="task-card" shadow="hover">
      <div :class="{ 'task-title': true, 'done': isDone }">
        {{ name }}
      </div>
      <div class="task-bottom-bar">
        <div class="task-icons">
          <fa :icon="['far', 'comment-alt']"/> 8
        </div>
        <avatar :size="24" :username="`${user.firstName} ${user.lastName}`" />
      </div>
    </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible">
     <edit-task :id="id" />
    </el-dialog>
    <vue-context ref="menu" >
      <template slot-scope="child">
        <li>
            <a href="#" @click.prevent="sendToBacklog(child)">
              Send to Backlog
            </a>
          </li>
      </template>
    </vue-context>
  </div>
</template>

<script>
import { VueContext } from "vue-context";
import { mapGetters } from "vuex";
import EditTask from "./EditTask.vue";
import ProjectsAPI from "../../api/projects";

export default {
  name: "BoardTask",
  props: ["name", "id", "user", "status"],
  components: { EditTask, VueContext },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    sendToBacklog(child) {
      console.log("send", child);
      ProjectsAPI.sendToBacklog(this.currentProject.id, this.id).then((response) => {
        console.log(response);
      });
    }
  },
  computed: {
    ...mapGetters(["currentProject"]),
    isDone() {
      return this.status === "DONE";
    }
  },
};
</script>

<style lang="scss" scoped>
  .task-card {
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    padding-bottom: 32px;
    margin-bottom: 8px;
  }

  .task-title {
    font-size: 16px;
    font-weight: 600;
    &.done {
      text-decoration: line-through;
    }
  }

  .task-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 8px;
    width: calc(100% - 32px);
    height: 32px;
    font-size: 16px;
  }
</style>
