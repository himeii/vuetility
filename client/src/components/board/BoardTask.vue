<template>
  <div>
    <div @click="openDialog" @contextmenu.prevent="$refs.menu.open($event, id)">
    <el-card shadow="hover">
      {{ name }}
    </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible">
     <edit-task :id="id" />
    </el-dialog>
    <vue-context ref="menu" >
      <template slot-scope="child">
        <li>
            <a href="#" @click.prevent="sendToBacklog(child)">
              Send to Backlog
            </a>
          </li>
      </template>
    </vue-context>
  </div>
</template>

<script>
import { VueContext } from "vue-context";
import { mapGetters } from "vuex";
import EditTask from "./EditTask.vue";
import ProjectsAPI from "../../api/projects";

export default {
  name: "BoardTask",
  props: ["name", "id"],
  components: { EditTask, VueContext },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    sendToBacklog(child) {
      console.log("send", child);
      ProjectsAPI.sendToBacklog(this.currentProject.id, this.id).then((response) => {
        console.log(response);
      });
    }
  },
  computed: {
    ...mapGetters(["currentProject"])
  },
};
</script>

<style lang="sass" scoped>

</style>
