/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import moduleComments from "./modules/comments";
import modulePosts from "./modules/posts";
import moduleUsers from "./modules/users";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    strict: true,
    modules: {
        postsModule: modulePosts,
        commentsModule: moduleComments,
        usersModule: moduleUsers
    }
  });
}
