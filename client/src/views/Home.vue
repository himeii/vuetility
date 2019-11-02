<template>
  <div class="home">
    <el-container>
      <el-row>
        <el-col :lg="{offset: 10, span: 4}" :sm="{offset:0, span: 24}">
          <el-card shadow="hover" class="login-card">
            <h1>Welcome to Vuetility</h1>
            <p>You can login via a form below</p>
            <el-form :ref="loginData" :model="loginData">
              <el-form-item label="Nickname or e-mail">
              <el-input name="login"
                        v-model="loginData.email"
                        placeholder="Please type in your nickname or e-mail"/>
              </el-form-item>
              <el-form-item label="Password">
              <el-input name="password"
                        v-model="loginData.password"
                        placeholder="Please type in your password"
                        type="password"
                        show-password/>
              </el-form-item>
              <el-button @click="login">Login</el-button>
            </el-form>
            <p>or</p>
            <a href="/auth/google">Google</a>
            <el-button class="social-login-button">Google</el-button>
            <el-button class="social-login-button">Twitter</el-button>
            <el-button @click="logout">Logout</el-button>
            <router-link to="/dashboard">
              <el-button @click="login">To dashboard</el-button>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthAPI from "../api/auth";

export default {
  name: "home",
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logout() {
      AuthAPI.logout();
    },
    login() {
      console.log("login");
      AuthAPI.login(this.loginData);
    }
  },

};
</script>

<style lang="scss" scoped>

.el-container {
  height: 100vh;
  align-items: center;
}

.el-row {
  width: 100%;
}

.login-card {
  text-align: center;
}

.el-form > * {
  margin: 10px 0;
}

.social-login-button {
  display: block;
  width: 100%;
  margin: 10px 0;
}

.el-button + .el-button {
  margin: 0;
}

</style>
