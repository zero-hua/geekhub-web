import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/signup/Signup.vue')
  },
  {
    path: '/classification',
    name: 'Classification',
    component: () => import(/* webpackChunkName: "classification" */ '../views/classification/Classification.vue')
  },
  {
    path: '/talk',
    name: 'Talk',
    component: () => import(/* webpackChunkName: "talk" */ '../views/talk/Talk.vue')
  },
  {
    path: '/creation',
    name: 'Creation',
    component: () => import(/* webpackChunkName: "creation" */ '../views/creation/Creation.vue')
  },
  {
    path: '/article/:aid',
    name: 'Article',
    component: () => import(/* webpackChunkName: "article" */ '../views/article/Article.vue')
  },
  {
    path: '/user/:username',
    name: 'User',
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user" */ '../views/user/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
