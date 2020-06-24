/* eslint-disable no-debugger */
// eslint-disable-next-line no-unused-vars
import commentsProxy from "../../_services/proxy/comment-proxy";
import proxyService from "../../_services/proxy/post-proxy.js";

const moduleComments = {
  state: {
    post: {}
  },
  getters: {
    post: state => {
      return state.post;
    }
  },
  actions: {
    GET_POST({ commit }, postId) {
      return proxyService.getPostById(postId).then(res => {
        commit("GET_POST", { post: res.data });
        return new Promise(resolve => {
          resolve(res);
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    ADD_COMMENT({ commit }, comment) {
      commentsProxy.createComment(comment).then(res => {
        commit("ADD_COMMENT", { comment: res.data });
        return new Promise(resolve => {
          resolve(res);
        });
      });
    },
    DELETE_COMMENT({ commit }, commentId) {
      return commentsProxy.deleteComment(commentId).then(res => {
        commit("DELETE_COMMENT", commentId);
        return new Promise(resolve => {
          resolve(res);
        });
      });
    },
    UPDATE_COMMENT({ commit }, comment) {
      return commentsProxy.updateComment(comment._id, comment).then(res => {
        commit("UPDATE_COMMENT", comment);
        return new Promise(resolve => {
          resolve(res);
        });
      });
    }
  },
  mutations: {
    GET_POST: (state, { post }) => {
      state.post = post;
    },
    ADD_COMMENT: (state, { comment }) => {
      state.post.comments = [...state.post.comments, comment];
    },
    DELETE_COMMENT: (state, commentId) => {
      const newComments = state.post.comments.filter(
        comment => comment._id !== commentId
      );
      state.post.comments = newComments;
    },

    UPDATE_COMMENT: (state, comment) => {
      const index = state.post.comments.findIndex(
        item => item._id == comment._id
      );
      const newComments = [
        ...state.post.comments.slice(0, index),
        comment,
        ...state.post.comments.slice(index + 1)
      ];
      state.post.comments = newComments;
    }
  }
};

export default moduleComments;
