
export const routes = [
  { path: '/', component(resolve){
        require(['./views/home'], resolve) }
  },
  { path: '/login', component(resolve){
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
        require(['./views/chatroom'], resolve) }
  },
  { path: '/chatwindow/:id', 
    name: 'chatwindow', component(resolve){
        require(['./views/chatwindow'], resolve)}
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
