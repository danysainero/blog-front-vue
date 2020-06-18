<template>
  <div id="app">
    <app-blog-header />
    <router-view />
  </div>
</template>

<script>
import AppBlogHeader from "../src/components/BlogHeader";
export default {
  name: "App",
  components: {
    AppBlogHeader
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>
