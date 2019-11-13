<template>
  <el-card>
    {{ name }} <el-button @click="takeTask">Take</el-button>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectAPI from "../../api/projects";

export default {
  name: "BacklogTask",
  props: ["id", "name", "status", "assigneeId"],
  computed: {
    ...mapGetters(["currentProject"])
  },
  methods: {
    takeTask() {
      ProjectAPI.takeTask(this.currentProject.id, this.id).then((response) => {
        console.log(response);
      });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
