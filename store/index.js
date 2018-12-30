import Vuex from 'vuex'
import _ from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state: {
      carts: []
    },
    getters: {
      items_count_in_cart: state => {
        if (state.carts !== null) {
          return state.carts.length
        } else {
          return 0
        }
      },
      items: state => {
        if (state.carts !== null) {
          let items = []
          let counter = {}
          for (let item of state.carts) {
            if (!counter[item.id]) {
              counter[item.id] = 0
            }
            // count each item
            counter[item.id]++
          }
          for (let id of Object.keys(counter)) {
            for (let cartItem of state.carts) {
              if (cartItem.id == id) {
                let itemToPush = Object.assign({}, cartItem)
                itemToPush.qty = counter[id]
                items.push(itemToPush)
                console.log(itemToPush)
                break
              }
            }
          }
          return items
          // return _.uniqBy(state.carts, 'id')
          // const result = state.carts.filter((element, index, self) => {
          //   return self.indexOf(element) === index
          // })
          // return result
        } else {
          return state.carts
        }
      },
      sum: state => {
        let r = []
        let counter = {}
        for (let item of state.carts) {
          if (!counter[item.id]) {
            counter[item.id] = 0
          }
          // count each item
          counter[item.id]++
        }
        for (let id of Object.keys(counter)) {
          for (let cartItem of state.carts) {
            if (cartItem.id == id) {
              let itemToPush = Object.assign({}, cartItem)
              itemToPush.qty = counter[id]
              r.push(itemToPush)
              break
            }
          }
        }

        let num = 0
        for (let i = 0; i < r.length; i++) {
          num += r[i].price * r[i].qty
        }
        return num
      }
    },
    mutations: {
      updateCarts: state => {
        state.carts = JSON.parse(sessionStorage.getItem('products'))
      },
      add_to_cart: (state, product) => {
        if (state.carts === null) {
          state.carts = []
        }
        state.carts.push(product)
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
      },
      minus_item: (state, product) => {
        let index = state.carts.indexOf(product)
        console.log(product)
        console.log(state.carts)
        state.carts.splice(index, 1)
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
      },
      delete_item: (state, product) => {
        //把carts裡面和傳進來這個product相同的item都刪掉
        let r = state.carts.filter(function(element) {
          return element.id !== product.id //true的話就丟進去
        })
        state.carts = r
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
      }
    }
  })
}

export default createStore
