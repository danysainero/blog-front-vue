import axios from 'axios'
import { applyPolyfills, defineCustomElements } from 'blog-stenciljs/loader'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

Vue.config.ignoredElements = [/blog-\w*/, /post-\w*/]

axios.interceptors.request.use(function (config) {
  const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7InVzZXJOYW1lIjoiYWRtaW4yIiwicm9sZSI6MCwiX2lkIjoiNWVlMDllMjVkNmU5ZDM5ZTE0ZjkxOTQzIn0sImlhdCI6MTU5MjQwODI2Nn0.G89xWBqssBGvWEJpdwA26qEhdntaiqHvJQU6dRxCua4'
  if (auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

applyPolyfills().then(() => {
  defineCustomElements(window)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
