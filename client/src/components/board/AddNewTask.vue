<template>
<div>

  <div class="add-new-task-button" @click="openDialog">
    <fa icon="plus"></fa>
  </div>

</div>
</template>

<script>
export default {
  name: "AddNewTask",
  props: ["openDialog"],
};
</script>

<style lang="scss" scoped>
  .add-new-task-button {
    padding: 16px;
    border: dashed 2px #bdbdbd;
    border-radius: 4px;
    color: #bdbdbd;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-color: #EBEEF5;
      color: #EBEEF5;
    }
    & svg {
      font-size: 24px;
    }
  }
</style>
