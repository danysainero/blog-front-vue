<template>
  <div class="the-header">
     <button
      class="the-header__button"
      v-if="!userIsAuthenticated"
      @click="logout">
        Logout
    </button>
    <div class="links-container">
    <router-link class="the-header__link" to="/posts">Home</router-link>
    <router-link class="the-header__link" to="/backoffice">Backoffice</router-link>
    </div>
   
  </div>
</template>

<script>
export default{
  name: "AppBlogHeader",
  data() {
    return {
      userIsAuthenticated: false
    }
  },
  mounted() {
    this.isAuthenticated()
  },
  updated() {
    this.isAuthenticated()
  },
  methods: {
    isAuthenticated() {
      this.userIsAuthenticated = !!JSON.parse(localStorage.getItem('user'));
    },
    logout() {
      localStorage.removeItem('user')
      this.userIsAuthenticated = false
      this.$router.push('/login')
    }
  },
};
</script>

<style scoped>
.the-header {
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.the-header__button,
.the-header__link {
  border-bottom: 1px solid transparent;
  color: #ffffff;
  font-size: 16px;
  margin: 0 5px;
  padding: 5px;
  text-decoration: none;
}
.the-header__button {
  appearance: none;
  background-color: grey;
  border: 0;
  border-radius: 4px;
  padding: 6px 8px;
}
.router-link-exact-active {
  border-bottom: 1px solid #ffffff;
}
</style>