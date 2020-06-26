import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "../components/PostList.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

function guardRoute(to, from, next) {
  let isAuthenticated = false;

  localStorage.getItem("token") ? (isAuthenticated = true) : (isAuthenticated = false);

  isAuthenticated ? next() : next("/login");
}

const routes = [
  {
    path: "/",
    redirect: "/home/posts"
  },
  {
    path: "/home",
    redirect: "/home/posts",
    component: Home,
    children: [
      {
        path: "posts",
        component: PostList
      },
      {
        path: "posts/:id",
        component: () => import("../components/PostDetail.vue")
      }
    ]
  },
  {
    path: "/",
    name: "backoffice",
    beforeEnter : guardRoute,
    component: () => import("../views/Backoffice.vue"),
    children: [
      {
        path: "backoffice",
        component: () => import("../components/PostListPrivate.vue")
      },
      {
        path: "backoffice/:id",
        component: () => import("../components/PostDetailPrivate.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/signup",
    component: () => import("../components/SignUp.vue")
  },
  { path: "*", component: () => import("../views/PageNotFound.vue") }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
