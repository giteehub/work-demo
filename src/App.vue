<template>
  <div id="app">
    <PDF/>
  </div>
</template>

<script>
import PDF from './components/PDF.vue'

export default {
  name: 'App',
  components: {
    PDF
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
