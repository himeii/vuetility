<template>
  <el-row class="register-row" justify="center" align="middle">
    <el-col :span="6" :offset="9">
      <el-card class="register-card">
        <h1>Sign up</h1>
        <el-form :ref="registerData" :model="registerData">
          <el-form-item label="Nickname or e-mail">
            <el-input name="email"
                      type="email"
                      placeholder="E-mail"
                      v-model="registerData.email"/>
            </el-form-item>
          <el-form-item label="First name">
            <el-input name="firstName"
                      placeholder="First name"
                      v-model="registerData.firstName"/>
          </el-form-item>
          <el-form-item label="Last name">
            <el-input name="lastName"
                      placeholder="Last name"
                      v-model="registerData.lastName"/>
          </el-form-item>
          <el-form-item label="Password">
            <el-input name="password"
                      type="password"
                      show-password
                      placeholder="Password"
                      v-model="registerData.password"/>
          </el-form-item>
          <el-button @click="register">Sign up</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "register",
  data() {
    return {
      registerData: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.registerData);
    },
    redirect() {
      return this.$router.replace("/app");
    }
  },
  mounted() {
    console.log(this.store, this.$store);
    if (this.$store.state.isAuthenticated) {
      this.redirect();
    }
    console.log(this.$router);
    return this.$store.watch(state => state.isAuthenticated, this.redirect);
  },
};
</script>

<style lang="scss" scoped>
  .register-row {
    height: 100%;
    align-items: center;
    display: flex;
  }

  .register-card {

    & h1 {
      text-align: center;
    }
  }
</style>
