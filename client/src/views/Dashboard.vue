<template>
  <el-container class="dashboard-container">
    <el-aside>
      <el-menu router>
        <el-menu-item index="/dashboard/board">
          <span slot="title">Board</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/backlog">
          <span slot="title">Backlog</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/planning">
          <span slot="title">Planning</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "Dashboard",
};
</script>

<style lang="sass" scoped>
  .dashboard-container
    height: 100%;

  .el-menu
    height: 100%;
</style>
