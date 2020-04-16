import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', redirect: 'login',
    }, {
      path: '/productList',
      component: () => import('@/page/productReserve/productList'),
      name: '产品预订',
      meta: {
        keepAlive: true,
        auth:true}
    }, { 
      path: '/insertOrder',
      component: () => import('@/page/productReserve/insertOrder'),
      name: '详情预定',
      meta: {
        keepAlive: true,
        auth:true}
    }, {
      path: '/productDetails', 
      component: () => import('@/page/productReserve/productDetails'),
      name: '产品详情',
      meta: {
        keepAlive: true,
        auth:true}
    },{
          path: '/orderManagement',
          component: () => import('@/page/orderManagement/orderList'),
          name: '订单管理',
          meta: {
              keepAlive: true,
              auth:true}
      },{
          path: '/userList',
          component: () => import('@/page/userList/userList'),
          name: '账户信息',
          meta: {
              keepAlive: true,
              auth:true}
      },{
          path: '/salesList',
          component: () => import('@/page/salesList/salesList'),
          name: '销售统计',
          meta: {
              keepAlive: true,
              auth:true}
      },{
      path: '/login',
      component: () => import('@/page/login/login'),
      meta: {
        keepAlive: false}
    },
    {
      path: '*',
      redirect:'/productList'
    }
  ],
})
