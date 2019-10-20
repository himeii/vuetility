<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,700&display=swap');

* {
  font-family: 'Josefin Sans', cursive, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
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
