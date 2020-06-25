<template>
  <div class="login-container">
    <div class="login">
      <h1>Sign up</h1>
      <label class="login__label" for="username">Username</label>
      <input
        class="login__input"
        type="text"
        name="username"
        id="username"
        v-model="username"
        autocomplete="off"
      />
      <label class="login__label" for="password">Password</label>
      <input class="login__input" type="password" name="password" id="password" v-model="password" />
      <button class="login__button" @click="login">Send</button>
    <a href="/login"> Ya tienes cuenta? Accede</a>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppLogin",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: { ...mapGetters(["users"]) },
  methods: {
    ...mapActions(["ADD_USER"]),

    login() {
      if (this.username && this.password) {
        const user = { username: this.username, password: this.password };
        this.ADD_USER(user);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  align-items: center;
  display: flex;
  height: 90vh;
  justify-content: center;
}
.login {
  background: rgb(221, 221, 221);
  border: 0.5px solid rgb(204, 204, 204);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 50px 20px;
  width: 50%;
}
.login__input,
.login__label {
  appearance: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  height: 50px;
  margin: 0;
}
.login__input {
  border: 1px solid rgb(214, 214, 214);
  flex-grow: 1;
  padding: 10px;
  width: 70%;
}
.login__label {
  padding: 10px 20px;
}
.login__button {
  appearance: none;
  background-color: #030681;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  height: 50px;
  margin: 25px 0;
  text-transform: uppercase;
  width: 50%;

  &:hover {
    background-color: #04079cc5;
  }
}

@media (max-width: 768px) {
  .login {
    padding: 20px;
    width: 80%;
  }

  .login__input {
    width: 90%;
  }

  .login__label {
    padding: 10px 20px;
  }
}
</style>