<template>
  <div>
    <div @click="openDialog">
    <el-card shadow="hover">
      {{ name }}
    </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible">
     <edit-task :id="id" />
    </el-dialog>
  </div>
</template>

<script>
import EditTask from "./EditTask.vue";

export default {
  name: "BoardTask",
  props: ["name", "id"],
  components: { EditTask },
  data() {
    return {
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

</style>
