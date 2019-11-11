<template>
  <div>
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "ProjectUser",
  props: ["id", "firstName", "lastName"],
  computed: {
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
