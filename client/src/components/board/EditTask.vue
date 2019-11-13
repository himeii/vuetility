<template>
  <div>
    Edit task {{ id }}
    <el-input type="text" v-model="task.name" placeholder="Name"></el-input>
    <el-input type="text" v-model="task.description" placeholder="Description"></el-input>
    <el-input type="number" v-model="task.estimate" placeholder="Estimate"></el-input>
    <el-input type="number" v-model="task.time_tracked" placeholder="Time tracked"></el-input>
    Reporter
    <v-select :options="currentProject.users"
      track-by="id" :value="task.reporter" @input="setReporter" :clearable="false">
      <template slot="option" slot-scope="props">
        <div>
          {{ props.option.firstName }} {{ props.option.lastName }}
        </div>
      </template>
      <template slot="singleLabel" slot-scope="props">
        <div>
          {{ props.option && props.option.firstName }} {{ props.option && props.option.lastName }}
        </div>
      </template>
    </v-select>
    Assignee
    <v-select
      :options="currentProject.users"
      track-by="id" :value="task.assignee" @input="setAssignee" :clearable="false">
      <template slot="option" slot-scope="props">
        <div>
          {{ props.option.firstName }} {{ props.option.lastName }}
        </div>
      </template>
      <template slot="singleLabel" slot-scope="props">
        <div>
          {{ props.option && props.option.firstName }} {{ props.option && props.option.lastName }}
        </div>
      </template>
    </v-select>
    <el-button @click="saveTask">Save</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectAPI from "../../api/projects";

export default {
  name: "EditTask",
  props: ["id", "projectId"],
  data() {
    return {
      selected: "USA",
      task: {
        name: "",
        description: "",
        estimate: 0,
        time_tracked: 0,
        status: "IN PROGRESS",
        createdAt: "",
        updatedAt: "",
        reporterId: "",
        assigneeId: "",
        reporter: {},
        assignee: {}
      },
    };
  },
  mounted() {
    ProjectAPI.getTask(this.currentProject.id, this.id).then((response) => {
      if (response.ok) {
        this.task = response.data;
        // this.reporter = response.data.reporter;
        // this.assignee = response.data.assignee;
      }
    });
  },
  methods: {
    saveTask() {
      ProjectAPI
        .updateTask(this.currentProject.id, this.id, this.task)
        .then(response => console.log(response));
    },
    setReporter(value) {
      console.log("setReporter", value);
      this.task.reporter = value;
      this.task.reporterId = value.id;
    },
    setAssignee(value) {
      console.log("setReporter", value);
      this.task.assignee = value;
      this.task.assigneeId = value.id;
    }
  },
  computed: {
    ...mapGetters(["currentProject"])
  },

};
</script>
