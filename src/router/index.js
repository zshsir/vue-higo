import { Notify } from 'vant'
import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'
const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component:() => import('../views/home/Home'),
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/',
    name: 'Home',
    component:() => import('../views/home/Home'),
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component:() => import('../views/category/Category'),
    meta:{
      title:'图书兄弟-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component:() => import('../views/detail/Detail'),
    meta:{
      title:'图书兄弟-商品详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component:() => import('../views/profile/Profile'),
    meta:{
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    },
    
  },
  {
    path: '/register',
    name: 'Register',
    component:() => import('../views/profile/Register'),
    meta:{
      title:'图书兄弟-注册',
    },

  },
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/profile/Login'),
    meta:{
      title:'图书兄弟-登入'
    }
  },
  {
    path: '/shotCart',
    name: 'ShotCart',
    component:() => import('../views/shotCart/ShotCart'),
    meta:{
      title:'购物车',
      isAuthRequired:true

    }
  },
  {
    path: '/address',
    name: 'AddAddress',
    component:() => import('../views/profile/Address'),
    meta:{
      title:'地址管理',
      isAuthRequired:true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component:() => import('../views/profile/AddressEdit'),
    meta:{
      title:'编辑地址',
      isAuthRequired:true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component:() => import('../views/order/CreateOrder'),
    meta:{
      title:'创建订单',
      isAuthRequired:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component:() => import('../views/order/Order'),
    meta:{
      title:'订单管理',
      isAuthRequired:true
    }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component:() => import('../views/order/OrderDetail'),
    meta:{
      title:'订单详情',
      isAuthRequired:true
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  //如果没有登入，在这里跳转login
  if(to.meta.isAuthRequired && store.state.user.isLogin === false){
    Notify('您还没有登入,请先登入')
    return next('/login')
  }else{

    
    next();

  }

  document.title = to.meta.title; 

})

export default router
