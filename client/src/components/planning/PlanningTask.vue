<template>
  <div class="planning-task">
    <el-card>
      <div v-show="fromPreviousSprint">From previous sprint</div>
      <div class="planning-task-name">
        {{ name }}
      </div>
      <div class="planning-task-bottom-bar">
        <avatar v-show="Boolean(assignee)" :username="`${assignee.firstName} ${assignee.lastName}`" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PlanningTask",
  props: ["id", "name", "fromPreviousSprint", "assignee"]
};
</script>

<style lang="scss" scoped>

</style>
