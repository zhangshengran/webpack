import Vue from 'vue'
import Router from 'vue-router'
// import index2 from '@/views/index.vue'
import index2 from './views/index.vue'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  // base: 'dist',
  routes: [
    {
      path: '/',
      name: 'index2',
      component: index2,
      // redirect: '/fangzhen',
    }
  
   
    // {
    //   path: '/404',
    //   component: Error
    // },
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
  ]
})
