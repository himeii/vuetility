<template>
  <div class="header-container">
    <h1 v-if="!currentProject">Home</h1>
    <h1 v-else>{{ currentProject.name }}</h1>
    <div class="header-user">
      <el-dropdown trigger="click">
        <div class="user">
        <avatar :username="username" /> {{ username }}
        </div>
        <el-dropdown-menu slot="dropdown">
          <div @click="logout">Logout</div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["username", "currentProject"])
  },
  methods: {
    ...mapActions(["logout"])
  },
};
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em;

    & .header-user {
      cursor: pointer;

      & .el-dropdown {
        font-size: 20px;
      }

      & .user {
        display: flex;
        align-items: center;

        & .vue-avatar--wrapper {
          height: 30px !important;
          width: 30px !important;
          font-size: 14px !important;
          font-family: 'Nunito Sans', sans-serif !important;
          margin-right: 4px;
          font-weight: bold;
        }
      }
    }
  }
</style>
