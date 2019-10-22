<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700,900&display=swap');
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,700&display=swap&subset=cyrillic');
* {
  font-family: "Nunito Sans", sans-serif;
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

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
