<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.debugging {
  font-family: monospace;
  width: fit-content;
  margin: 0 auto;
  text-align: left;
}

.b1 {
  display: inline-block;
  cursor: pointer;
  transition: 0.2s ease all;
  border-width: 1px;
  border-style: solid;
  border-color: #222222;
  font-weight: 600;
  line-height: 20px;
  /* font-family: 'Circular',-apple-system,'BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif; */
  font-size: 16px;
  border-radius: 8px;
  padding: 13px 23px;
  background: white;
  color: #222222;
  text-decoration: none;
}
.b1:hover, .b1:active{
  border-color: #000000;
  background: #f7f7f7;
}
.b1:active {
  transform: scale(0.96);
}

.bmain {
  background: green;
  color: white;
  border: none;
}
.bmain:hover, .bmain:active {
  background: #009000;
}
.bmain:disabled {
  background: #DDDDDD;
  cursor: not-allowed;
}

.nav-margin-top{
  margin-top: 80px;
}

</style>
