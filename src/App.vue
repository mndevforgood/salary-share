<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  min-height: 100vh;
}
body {
  margin: 0;
}
p {
  width: 100%;
  max-width: 450px;
  margin: 0 auto 10px;
}
#app {
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  display: flex;
  padding: 0 10px;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  background: #159957; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #159957,
    #155799
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #159957,
    #155799
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
