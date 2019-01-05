import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import RoundRobin from './components/RoundRobin/RoundRobin'
import Home from './components/Home'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
	{ path: '/roundRobin', component: RoundRobin, name: 'RoundRobin' },
	{ path: '*', component: Home, name: 'Home' }
]

const router = new VueRouter({
	routes
})

new Vue({
  store,
  router,
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
