import shop from '.././../api/shop'
import * as types from './mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: null,
  //------------product------------
  all: []
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus,
  //------------product------------
  allProducts: state => state.all,
  //------------all--------------
  cartProducts: state => {
    return state.added.map(({ id, quantity }) => {
      const product = state.all.find(p => p.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    )
  },
  //------------product------------
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  },
  //-------------all--------------
  addToCart: ({ commit }, product) => {
    if (product.inventory > 0) {
      commit(types.ADD_TO_CART, {
        id: product.id
      })
    }
  }
}

// mutations
const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({
        id,
        quantity: 1
      })
    } else {
      record.quantity++
    }
    state.all.find(p => p.id === id).inventory--
  },

  [types.CHECKOUT_REQUEST] (state) {
    // clear cart
    state.added = []
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  },
  //---------------product-------------
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}