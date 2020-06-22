// eslint-disable-next-line no-unused-vars
import proxyService from "../../_services/proxy/post-proxy.js";


const modulePosts = { 
    state: {
        posts: [],
        post: {}
      },
      getters: {
        posts: state => {
          return state.posts;
        },
        post: state => {
          return state.post;
        }
      },
      actions: {
        GET_ALL_POSTS({ commit }) {
          return proxyService.getAllPost().then(res => {
            commit("GET_ALL_POSTS", { posts: res.data });
            return new Promise((resolve) => {
              resolve(res);
            });
          });
        },
        GET_POST({ commit }, postId) {
          return proxyService.getPostById(postId).then(res => {
            commit("GET_POST", { post: res.data });
            return new Promise((resolve) => {
              resolve(res);
            });
          });
        },
        ADD_POST({ commit }, post) {
          return proxyService.createPost(post).then(res => {
            commit("ADD_POST", { post: res.data });
            return new Promise((resolve) => {
              resolve(res);
            });
          });
        },
        DELETE_POST({ commit }, postId) {
          return proxyService.deletePost(postId).then(res => {
            commit("DELETE_POST", postId);
            return new Promise((resolve) => {
              resolve(res);
            });
          });
        },
        UPDATE_POST({ commit }, post) {
          return proxyService.updatePost(post._id, post).then(res => {
            commit("UPDATE_POST", post);
            return new Promise((resolve) => {
              resolve(res);
            });
          });
        }
      },
      mutations: {
        GET_ALL_POSTS: (state, { posts }) => {
          state.posts = posts;
        },
        GET_POST: (state, { post }) => {
          state.post = post;
        },
        ADD_POST: (state, { post }) => {
          state.posts = [...state.posts, post];
        },
        DELETE_POST: (state, postId) => {
          state.posts = state.posts.filter(post => post._id !== postId);
        },
        UPDATE_POST: (state, post) => {
          const index = state.posts.findIndex(item => item._id === post._id);
          const newPosts = [...state.posts.slice(0, index), post, ...state.posts.slice(index + 1)];
          state.posts = newPosts;
        }
      },
}

export default modulePosts;