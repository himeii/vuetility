<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "onLogout") {
        console.log(state, "mutations");
        this.$router.push("/");
      }
    });
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700,900&display=swap');
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,700&display=swap&subset=cyrillic');
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,900&display=swap');
@import '~vue-context/dist/css/vue-context.css';

* {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

body, html, #app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

.heading {
  font-size: 48px;
  font-weight: 900;
  margin: 0;
}

</style>
