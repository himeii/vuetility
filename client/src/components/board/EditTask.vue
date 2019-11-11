<template>
  <div>
    Edit task {{ id }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectAPI from "../../api/projects";

export default {
  name: "EditTask",
  props: ["id"],
  data() {
    return {
      task: {}
    };
  },
  mounted() {
    ProjectAPI.getTask(this.currentProject.id, this.id).then((response) => {
      if (response.ok) {
        this.task = response.data;
      }
    });
  },
  computed: {
    ...mapGetters(["currentProject"])
  },

};
</script>
