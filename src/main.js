import Vue from 'vue'
import App from './App'
import router from './router'
import global from './components/tools/global'
import store from '@/store'


// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

//axios
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios
Vue.prototype.qs = qs
//global variable
Vue.prototype.GLOBAL = global
Vue.config.productionTip = false


axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('tyToken')
    if(token) {  
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
 });
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      switch (error.response.status) {
             case 401:
              sessionStorage.removeItem('tyToken');
              sessionStorage.removeItem('tyUserInfo');
              router.replace({
                 path: 'login',
                 query: {redirect: router.currentRoute.fullPath}
         })
      }
      return Promise.reject(error.response)  
  });


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

if(JSON.parse(sessionStorage.getItem('tyUserInfo'))){
    vm.$router.beforeEach((to,from,next) => {
      if(to.matched.some( m => m.meta.auth)){
        if(JSON.parse(sessionStorage.getItem('tyUserInfo'))) {  
          next()        
        }else{
          next({path:'/login',query:{ Rurl: to.fullPath} })
          sessionStorage.removeItem('tyToken');
          sessionStorage.removeItem('tyUserInfo');
        }
      }else{
        next()
      }
    })
  }else{
    vm.$router.push({ path: '/login' })
  }
