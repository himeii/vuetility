<template>
  <el-menu class="main-aside-menu" router :collapse="collapsed" :collapse-transition="false" >
    <el-menu-item index="/app">
      <fa icon="home" />
      <span slot="title">Home</span>
    </el-menu-item>
    <el-menu-item index="/app/my-tasks">
      <fa icon="tasks"  />
      <span slot="title">My Tasks</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "MainAside",
  props: ["collapsed"],
};
</script>

<style lang="scss" scoped>
  .main-aside-menu {
    overflow: hidden;

    & .el-menu-item {
      font-size: 16px;

      & svg {
        margin-right: 8px;
      }
    }
  }
</style>
