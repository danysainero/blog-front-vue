import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'posts',
    component: Home,
    children: [
      {
        path: "posts",
        component: () => import('../components/PostList.vue')
      },
      {
        path: "posts/:id",
        component: () => import('../components/PostDetail.vue')
      },
      
    ]
  },
   {
    path: '/',
    name: 'backoffice',
    component: () => import('../views/Backoffice.vue'),
    children: [
      {
        path: "backoffice",
        component: () => import('../components/PostListPrivate.vue')
      },
      {
        path: "backoffice/:id",
        component: () => import('../components/PostDetailPrivate.vue')
      }
    ]
  },
  { path: "*", component: () => import('../views/PageNotFound.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
