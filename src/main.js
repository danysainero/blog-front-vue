import { applyPolyfills, defineCustomElements } from "blog-stenciljs/loader";
import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import { createStore } from "./store";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/blog-\w*/, /post-\w*/];
Vue.use(Vuelidate);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

const store = createStore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
