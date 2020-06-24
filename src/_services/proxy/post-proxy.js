import axios from "axios";
import '../blog-interceptor';

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

};
