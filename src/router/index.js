import Vue from 'vue'
import Router from 'vue-router'
import productList from '@/page/productReserve/productList'
import login from '@/page/login/login'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', redirect: 'login',
    }, {
      path: '/productList',
      component: productList,
      name: '产品预定',
      meta: {
        keepAlive: true,
        auth:true}
    },{
      path: '/login',
      component: login,
      meta: {
        keepAlive: false}
    },
    {
      path: '*',
      redirect:'/productList'
    }
  ],
})
