<template>
  <div class="login-container">
    <div class="login">
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
      <button class="login__button" @click="handleLogin">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppLogin",
  data() {
    return {
      username: "",
      password: "",
      token: ""
    };
  },
  methods: {
    handleLogin() {
      if (this.username && this.password) {
        const auth = btoa(`${this.username}:${this.password}`);

        let config = {
          headers: {
            headers: { "Content-Type": "application/json" },
            Authorization: "Basic " + auth
          }
        };

        axios.post(`http://localhost:3001/api/login`, '', config).then(res => {
          this.token = res.data;
          localStorage.setItem("token", this.token.token);
            this.$router.push("/backoffice");
        });

       
         
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  align-items: center;
  display: flex;
  height: 80vh;
  justify-content: center;
}
.login {
  background: rgb(233, 233, 233);
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