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
              <el-input name="email"
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
            <div>
              New to our platform? <router-link to="register">Sign up</router-link>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

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
    login() {
      this.$store.dispatch("login", this.loginData);
    },
    redirect() {
      if (this.$store.state.isAuthenticated) {
        return this.$router.replace("/app").catch(err => err);
      } return this.$router.replace("/").catch(err => err);
    }
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.redirect();
    }
    this.$store.watch(state => state.isAuthenticated, this.redirect);
    this.$store.subscribeAction(
      {
        after: (action, state) => {
          if (action.type === "logout" && !state.isAuthenticated) {
            this.$router.push("/").catch(err => err);
          }
        }
      }
    );
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
