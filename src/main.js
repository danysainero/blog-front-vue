import axios from "axios";
import { applyPolyfills, defineCustomElements } from "blog-stenciljs/loader";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.config.ignoredElements = [/blog-\w*/, /post-\w*/];

axios.interceptors.request.use(
  function(config) {
    const auth_token = localStorage.getItem("token");
  
    if (config.url !== "http://localhost:3001/api/login") {
      if (auth_token) {
        config.headers.Authorization = `Bearer ${auth_token}`;
      }
      return config;
    } else {
      return config;
    }
  },
  function(err) {
    return Promise.reject(err);
  }
);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
