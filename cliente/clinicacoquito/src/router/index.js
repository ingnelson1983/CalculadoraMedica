import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [


  {
    path: '/serviciosmedicos',
    name: 'Servicios Médicos',
    component: () => import(/* webpackChunkName: "about" */ '../views/ServiciosMedicos.vue')
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: () => import(/* webpackChunkName: "about" */ '../views/Servicios.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  ,
  {
    path: '/pacientes',
    name: 'Pacientes',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacientes.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
