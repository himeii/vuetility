<template>
  <div>
    Management
    <project-users :users="users" />
    <invite-user :onInviteUser="inviteUser" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ProjectUsers from "./ProjectUsers.vue";
import InviteUser from "./InviteUser.vue";
import ProjectAPI from "../../api/projects";


export default {
  name: "Management",
  components: { ProjectUsers, InviteUser },
  data() {
    return {
      users: []
    };
  },
  methods: {
    setUsers(users) {
      this.users = users;
    },
    inviteUser(email) {
      ProjectAPI.inviteUser(this.currentProject().id, email).then((response) => {
        if (response.ok) {
          this.users = [...this.users, response.data];
        }
      });
    },
    ...mapGetters(["currentProject"])
  },
  mounted() {
    ProjectAPI.getUsers(this.currentProject().id).then((response) => {
      if (response.ok) {
        this.setUsers(response.data.users);
      }
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
