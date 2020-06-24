import axios from "axios";
import router from "../../router";

export default {

login(user) {
    const auth = btoa(`${user.username}:${user.password}`);

    let config = {
      headers: {
        headers: { "Content-Type": "application/json" },
        Authorization: "Basic " + auth
      }
    };

    return axios
      .post(`http://localhost:3001/api/login`, "", config)
      .then(res => {
        const token = res.data;
        localStorage.setItem("token", token.token);
        //this.$router.push("/backoffice");
        router.push("/backoffice");
        return token
      });
  }

};