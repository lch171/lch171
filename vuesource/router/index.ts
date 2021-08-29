import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import mainview from '../components/mainview.vue'
import problem from '../components/problem.vue'
import evalualist from '../components/evalualist.vue'
import problemlist from '../components/problemlist.vue'
import evaluaothers from '../components/evaluaothers.vue'
import store from '../store'
import test from '../components/test.vue'
import login from '../components/login.vue'
import evalechart from '../components/evalechart.vue'
import staffAnsInfo from '../components/staffAnsInfo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/mainview',
    name: 'mainview',
    component: mainview,
    children: [
      {
        path: 'evalualist',
        name: 'evalualist',
        component: evalualist
      },
      {
        path: 'evaluaothers',
        name: 'evaluaothers',
        component: evaluaothers
      },
      {
        path: 'evalechart',
        name: 'evalechart',
        component: evalechart
      },
      {
        path: 'staffAnsInfo',
        name: 'staffAnsInfo',
        component: staffAnsInfo
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/problem',
    name: 'problem',
    component: problem
  },
  {
    path: '/problemlist',
    name: 'problemlist',
    component: problemlist
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (store.state.staff.STF_CARD) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
