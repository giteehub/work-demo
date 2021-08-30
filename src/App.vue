<template>
  <div id="app">
    <!-- <PDF/> -->
    <!-- <tabs/> -->
    <date/>
  </div>
</template>

<script>
// import PDF from './components/PDF.vue'
// import tabs from './components/tabs.vue'
import date from './components/date.vue'

export default {
  name: 'App',
  components: {
    date
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
