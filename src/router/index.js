import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Stock from '@/components/Stock'
import BootstrapVue from 'bootstrap-vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(BootstrapVue);
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Stock',
      name: 'Stock',
      component: Stock
    }
  ]
})
