import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import { products } from './../api'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    products: [],
    shoppingCart: {
      items: [
      ]
    }
  },
  getters: {
    productBy (state) {
      return categoryId => state.products.filter(
        product => product.sublevel_id == categoryId
      )
    },
    totalCartValue (state) {
      let value = 0
      state.shoppingCart.items.forEach(({ quantity, priceNumber }) => {
        value += priceNumber * quantity
      })
      // regex to put the comma on mile points
      value = `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      return value
    }
  },
  mutations: {
    addProduct (state, payload) {
      const isAlreadyIn = state.shoppingCart.items.find(item => item.id === payload.id)
      if (isAlreadyIn) {
        state.shoppingCart.items = state.shoppingCart.items.map(item => {
          if (item.id == payload.id) {
            item.quantity += payload.quantity
          }
          return item
        })
      } else {
        state.shoppingCart.items.push(payload)
      }
    },
    updateProducts (state, payload) {
      state.products = payload
    },
    removeItemFromCart (state, payload) {
      state.shoppingCart.items = state.shoppingCart.items.filter(({ id }) => id !== payload.id)
    },
    cleanShoppingCart (state) {
      state.shoppingCart = {
        items: []
      }
    },
    setProducts (state, payload) {
      state.products = payload
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
