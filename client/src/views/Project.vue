<template>
  <el-container class="project-container">
    <el-aside width="auto">
      <el-menu router>
        <el-menu-item index="board">
          <span slot="title">Board</span>
        </el-menu-item>
        <el-menu-item index="backlog">
          <span slot="title">Backlog</span>
        </el-menu-item>
        <el-menu-item index="planning">
          <span slot="title">Planning</span>
        </el-menu-item>
        <el-menu-item index="retrospective">
          <span slot="title">Retrospective</span>
        </el-menu-item>
        <el-menu-item index="management">
          <span slot="title">Management</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

import { mapGetters } from "vuex";
import socket from "../api/websocket";

export default {
  name: "Project",
  mounted() {
    socket.emit("join-project", { id: this.currentProject.id, sid: socket.id });
  },
  beforeDestroy() {
    socket.emit("leave-project", { id: this.currentProject.id, sid: socket.id });
  },
  computed: {
    ...mapGetters(["currentProject"])
  },
};
</script>

<style lang="scss" scoped>
  .project-container{
    height: 100%;
  }

  .el-menu {
    height: 100%;
  }

  .el-menu-item {
    padding: 0 80px;
  }

  .el-main {
    padding: 0 20px;
  }
</style>
