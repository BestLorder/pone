import Vue from 'vue'
import Router from 'vue-router'

const homePage = () => import('../pages/homePage')
const login = () => import('../pages/login')
const register = () => import('../pages/register')
const board = () => import('../pages/board')
const search = () => import('../pages/search')
const addPerson = () => import('../pages/addPerson')
const person = () => import('../pages/person')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'homePage'
    },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/register',
          name: 'register',
          component: register
      },
      {
          path: '/homePage',
          name: 'homePage',
          component: homePage
      },
      {
          path: '/board/:id',
          name: 'board',
          component: board
      },
      {
          path: '/search',
          name: 'search',
          component: search
      },
      {
          path: '/addPerson',
          name: 'addPerson',
          component: addPerson
      },
      {
          path: '/person/:id',
          name: 'person',
          component: person
      },
  ]
})
