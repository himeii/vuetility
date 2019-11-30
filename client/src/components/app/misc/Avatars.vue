<template>
  <div class="avatars-wrapper">
    <div v-for="user in users"
      :key="user.id" @click="select(user)" :class="{'selected': selected.includes(user.id)}">
      <avatar :username="`${user.firstName} ${user.lastName}`" ></avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatars",
  props: ["users", "onSelect"],
  data() {
    return {
      selected: []
    };
  },
  methods: {
    select(data) {
      const found = this.selected.find(id => id === data.id);
      if (found) {
        this.selected = this.selected.filter(id => id !== data.id);
      } else {
        this.selected = [...this.selected, data.id];
      }
      this.onSelect(this.selected);
    }
  },
};
</script>

<style lang="scss" scoped>
  .avatars-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    & > div:not(:first-child) {
      margin-left: -6px;

    }
    & .vue-avatar--wrapper {
      width: 40px !important;
      height: 40px !important;
      font-family:  'Nunito Sans', sans-serif !important;
      font-size: 16px !important;
      font-weight: bold !important;
      position: relative;
    }

    & .selected {
      & .vue-avatar--wrapper {
        border: 3px #4fc08d solid;
        z-index: 1;
      }
    }
  }
</style>
