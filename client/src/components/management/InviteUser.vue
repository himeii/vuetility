<template>
  <div>
    <el-input type="email" placeholder="E-mail" v-model="email" />
    <el-button @click="invite">Invite</el-button>
  </div>
</template>

<script>
export default {
  name: "InviteUser",
  props: ["onInviteUser"],
  data() {
    return {
      email: ""
    };
  },
  methods: {
    invite() {
      this.onInviteUser(this.email);
    }
  },
};
</script>
