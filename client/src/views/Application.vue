<template>
    <el-container class="app-container">
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <main-aside :collapsed="collapsed"></main-aside>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import Header from "../components/navigation/Header.vue";
import MainAside from "../components/navigation/MainAside.vue";

export default {
  name: "Application",
  components: { "v-header": Header, MainAside },
  props: ["collapsed"]
};
</script>

<style lang="scss" scoped>
  .app-container {
    height: 100%;

    & .el-aside {
      height: 100%;
      & ul {
        height: 100%;
      }
    }

    & .el-main {
      padding: 0;
    }
  }
</style>
