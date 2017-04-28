import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Home from './views/home'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home ,
    meta: {
      requireAuth: true,
    },
  },
  { path: '/img', component(resolve){
        require(['./views/imgtest'], resolve) }
  },
  { path: '/vido', component(resolve){
        require(['./views/media/vidio'], resolve) }
  },
  { path: '/login',
    name: 'login',component(resolve){
        require(['./views/login'], resolve) }
  },
  { path: '/register', component(resolve){
        require(['./views/register'], resolve) }
  },
  { path: '/home', component(resolve){
        require(['./views/home'], resolve) }
  },
  { path: '/task/index/:id', 
    name: 'taskIndex', component(resolve){
        require(['./views/task/index'], resolve)}
  },
  { path: '/task/math/:id', 
    name: 'taskMath', component(resolve){
        require(['./views/task/math'], resolve)}
  },
  { path: '/task/chinese/:id', 
    name: 'taskChinese',component(resolve){
        require(['./views/task/chinese'], resolve)}
  },
  { path: '/me', component(resolve){
        require(['./views/me/methree'], resolve)}
  },
  { path: '/me/one', component(resolve){
        require(['./views/me/meone'], resolve)}
  },
  { path: '/me/two', component(resolve){
        require(['./views/me/metwo'], resolve)}
  },
  { path: '/me/three', component(resolve){
        require(['./views/me/methree'], resolve)}
  },
  { path: '/find', component(resolve){
        require(['./views/find'], resolve) }
  },
  { path: '/more', component(resolve){
        require(['./views/more'], resolve) }
  },
  { path: '/chat', component(resolve){
        require(['./views/chat/chatroom'], resolve) }
  },
  { path: '/chatwindow/:id', 
    name: 'chatwindow', component(resolve){
        require(['./views/chat/chatwindow'], resolve)}
  },
  { path: '/info', component(resolve){
        require(['./views/side/info'], resolve) }
  },
  { path: '/time', component(resolve){
        require(['./views/side/time'], resolve) }
  },
  { path: '/tip', component(resolve){
        require(['./views/side/tip'], resolve) }
  }

]


if (window.sessionStorage.getItem('usr')) {
    store.commit('setUsr', JSON.parse(window.localStorage.getItem('usr')))
}

const router = new VueRouter({
  /*mode: 'history',*/ //HTML5 History 模式
    base: __dirname,
    routes 
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.usr && store.state.usr._id) {
            next()
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next()
    }
})

export default router
