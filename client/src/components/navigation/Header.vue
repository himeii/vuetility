<template>
  <div class="header-container">
    <h1 v-if="!currentProject">Home</h1>
    <h1 v-else>{{ currentProject.name }}</h1>
    <div class="header-user">
      <el-dropdown trigger="click">
        <div>
        <fa icon="user" /> {{ username }}
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
    }
  }
</style>
