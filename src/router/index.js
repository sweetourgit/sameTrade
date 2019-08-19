import Vue from 'vue'
import Router from 'vue-router'
import productList from '@/page/productReserve/productList'
import reserveList from '@/page/productReserve/reserveList'
import detailsList from '@/page/productReserve/detailsList'
import orderManagement from '@/page/orderManagement/orderList'
import userList from '@/page/userList/userList'
import salesList from '@/page/salesList/salesList'
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
    }, {
      path: '/reserveList',
      component: reserveList,
      name: '详情预定',
      meta: {
        keepAlive: true,
        auth:true}
    }, {
      path: '/detailsList',
      component: detailsList,
      name: '产品详情',
      meta: {
        keepAlive: true,
        auth:true}
    },{
          path: '/orderManagement',
          component: orderManagement,
          name: '订单管理',
          meta: {
              keepAlive: true,
              auth:true}
      },{
          path: '/userList',
          component: userList,
          name: '账户信息',
          meta: {
              keepAlive: true,
              auth:true}
      },{
          path: '/salesList',
          component: salesList,
          name: '销售统计',
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
