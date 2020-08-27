import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryList from '../views/Category/CategoryList.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
import GoodsList from '../views/Goods/GoodsList.vue'
import GoodsEdit from '../views/Goods/GoodsEdit.vue'
import HeroList from '../views/Hero/HeroList.vue'
import HeroEdit from '../views/Hero/HeroEdit.vue'


Vue.use(VueRouter)

  const routes = [
  { path: '/',
    name: 'Home',
    component: Home,
    children:[
      { path:'/categories/list',component:CategoryList},
      { path:'/categories/create',component:CategoryEdit},
      { path:'/categories/edit/:id',component:CategoryEdit,props:true },

      { path:'/goods/list',component:GoodsList},
      { path:'/goods/create',component:GoodsEdit},
      { path:'/goods/edit/:id',component:GoodsEdit,props:true },

      { path:'/heros/list',component:HeroList},
      { path:'/heros/create',component:HeroEdit},
      { path:'/heros/edit/:id',component:HeroEdit,props:true },
      {
        path:'/',
        redirect:'/heros/list'
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
