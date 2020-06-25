import axios from "axios";
import '../blog-interceptor';

const API_URL = "http://localhost:3001/api/blog/comments/";

export default {

  createComment(comment) {
     return axios.post(`${API_URL}` + comment.postId, {commentContent: comment.commentContent});
  },
  deleteComment(commentId) {
    return axios.delete(`${API_URL}` + commentId);
  },
  updateComment(commentId, comment) {
    return axios.put(`${API_URL}` + commentId, comment);
  },

};
