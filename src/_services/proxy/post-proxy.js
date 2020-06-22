import axios from "axios";
import router from "../../router";
const API_URL = "http://localhost:3001/api/blog/posts";

export default {
  createPost(post) {
    return axios.post(`${API_URL}`, post);
  },
  getAllPost() {
    return axios.get(`${API_URL}`);
  },
  getPostById(postId) {
    return axios.get(`${API_URL}/` + postId);
  },
  deletePost(postId) {
    return axios.delete(`${API_URL}/` + postId);
  },
  updatePost(postId, post) {
    return axios.put(`${API_URL}/` + postId, post);
  },
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
