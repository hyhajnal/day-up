import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  }
}

/*export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})*/

export default {
  state,
  getters,
  actions,
  mutations
}