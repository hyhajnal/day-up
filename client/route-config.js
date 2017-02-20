
export const routes = [
  { path: '/', component(resolve){
        require(['./views/home'], resolve) }
  },
  { path: '/home', component(resolve){
        require(['./views/home'], resolve) }
  },
  { path: '/task/index/:id', 
    name: 'taskIndex', component(resolve){
        require(['./views/task/index'], resolve)}
  },
  { path: '/task/math/:id', component(resolve){
        require(['./views/task/math'], resolve)}
  },
  { path: '/task/chinese/:id', component(resolve){
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
        require(['./views/task/chinese'], resolve) }
  },
  { path: '/chatwindow/:id', 
    name: 'chatwindow', component(resolve){
        require(['./views/chatwindow'], resolve)}
  },
  { path: '/shopCart', component(resolve){
        require(['./views/shopCart'], resolve) }
  }

]
