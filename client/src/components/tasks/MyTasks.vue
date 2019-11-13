<template>
  <div>
    My Tasks
  </div>
</template>

<script>
import UserAPI from "../../api/auth";

export default {
  name: "MyTasks",
  mounted() {
    UserAPI.getMyTasks().then((response) => {
      console.log(response);
    });
  },
};
</script>
