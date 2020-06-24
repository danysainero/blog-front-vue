<template>
  <div class="the-header">
    <div class="btn-container">
      <button class="the-header__button" 
      @click="logout"
      v-if="users.length > 0"
      >Logout</button>
    <p class="the-header__user"  v-if="users.length > 0"> Bienvenido {{users[0].userName}}</p>
     </div>
    <div class="links-container">
      <router-link class="the-header__link" to="/home/posts">Home</router-link>
      <router-link class="the-header__link" to="/backoffice">Backoffice</router-link>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppBlogHeader",
  data() {
    return {
      token: localStorage.getItem("token")
    };
  },
  computed: { ...mapGetters(["users"]) },
  beforeMount() {
    if (this.token) {
      this.CHECK_USER();
    }
  },
  methods: {
    ...mapActions(["CHECK_USER", "REMOVE_USER"]),
    logout() {
      if (this.token) {
        this.REMOVE_USER();
        this.$router.push("/login");
      }
    }
  }
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

.btn-container{
  display: flex;
  align-items: center;
}
.the-header__button {
  appearance: none;
  background-color: grey;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 8px;
}

.the-header__user{
  color: #01897B;
  font-weight: 900;
  margin-left: 20px;
  text-transform: uppercase;
}
.router-link-exact-active {
  border-bottom: 1px solid #ffffff;
}
</style>