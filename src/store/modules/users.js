import VueJwtDecode from "vue-jwt-decode";
import proxyService from "../../_services/proxy/post-proxy.js";

const moduleUsers = {
  state: {
    users: []
  },
  getters: {
    users: state => {
      return state.users;
    }
  },
  actions: {
    CHECK_USER({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        const jwtDecoded = VueJwtDecode.decode(token);
        commit("ADD_USER", { user: jwtDecoded.body });
      }
    },
    REMOVE_USER({ commit }) {
          commit("REMOVE_USER");
          localStorage.removeItem('token');
      },
    // eslint-disable-next-line no-unused-vars
    ADD_USER({ commit }, user) {
      return proxyService.login(user).then(res => {
        const jwtDecoded = VueJwtDecode.decode(res.token);
        commit("ADD_USER", { user: jwtDecoded.body });
        return new Promise(resolve => {
          resolve(res);
        });
      });
    }
  },
  mutations: {
    ADD_USER: (state, { user }) => {
      state.users = [...state.users, user];
    },
    REMOVE_USER: (state) => {
        state.users = [];
      }
  }
};

export default moduleUsers;
