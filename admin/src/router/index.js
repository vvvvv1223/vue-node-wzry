import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryList from '../views/Category/CategoryList.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'


Vue.use(VueRouter)

  const routes = [
  { path: '/',
    name: 'Home',
    component: Home,
    children:[
      { path:'/categories/list',component:CategoryList},
      { path:'/categories/create',component:CategoryEdit},
      { path:'/categories/edit/:id',component:CategoryEdit,props:true },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
