import * as types from './mutation_types'
export const STORAGE_KEY = 'todos-vuejs'

// 判断是否在PhantomJs上跑，>-1 是
// PhantomJS 是一个基于 WebKit 的服务器端 JavaScript API，它全面支持web而不需浏览器
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

const InitState = [
  {text: 'fewf', done: false},
  {text: 'fewf', done: false},
  {text: 'fewf', done: false},
  {text: 'fewf', done: false}
]
export const state = {
  /*todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY))|| InitState*/
  todos: null
}

export const actions = {
  initTodo ({ commit }, todos) {
    commit( types.INIT_TODO, todos )
  },
  addTodo ({ commit }, text){
    commit( types.ADD_TODO, text )
  },
  deleteTodo ({ commit }, todo){
    commit( types.DELETE_TODO, todo )
  },
  toogleTodo ({ commit }, todo){
    commit( types.TOOGLE_TODO, text )
  },
  editTodo ({ commit }, value){
    commit( types.EDIT_TODO, vale )
  },
  toggleAll ({ commit }, done){
    commit( types.TOOGLE_ALL, done )
  },
  clearCompleted ({ commit }){
    commit( types.CLEAR_COMPLETED)
  }


}

export const mutations = {
  [types.INIT_TODO] (state, { todos }) {
    state.todos = todos
  },
  [types.ADD_TODO] (state, { text }) {
    console.log(state.todos)
    state.todo.todos.push({
      text,
      done: false
    })
  },

  [types.DELETE_TODO] (state, { todo }) {
    state.todos.splice(state.todo.todos.indexOf(todo), 1)
  },

  [types.TOOGLE_TODO] (state, { todo }) {
    todo.done = !todo.done
  },

  [types.EDIT_TODO] (state, { todo, value }) {
    todo.text = value
  },

  [types.TOOGLE_ALL] (state, { done }) {
    state.todo.todos.forEach((todo) => {
      todo.done = done
    })
  },

  [types.CLEAR_COMPLETED] (state) {
    state.todo.todos = state.todo.todos.filter(todo => !todo.done)
  }
}