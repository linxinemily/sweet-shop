import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      carts: [
        {
          id: 1,
          name: '馬卡龍',
          price: 450,
          imgUrl: 'https://bit.ly/2OUteif',
          category: '新品上市',
          qty: 1
        }
      ]
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
          const result = state.carts.filter((element, index, self) => {
            return self.indexOf(element) === index
          })
          return result
        } else {
          return state.carts
        }
      },
      sum: state => {
        let r = state.carts.filter(function(element, index, self) {
          return self.indexOf(element) === index
        })
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
        if (!product.qty) {
          product.qty = 1
        } else {
          product.qty += 1
        }
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
      },
      minus_item: (state, product) => {
        let index = state.carts.indexOf(product)
        state.carts.splice(index, 1)
        product.qty -= 1
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
      },
      delete_item: (state, product) => {
        //把carts裡面和傳進來這個product相同的item都刪掉
        let r = state.carts.filter(function(element) {
          return element !== product //true的話就丟進去
        })
        state.carts = r
        product.qty = 0
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
      }
    }
  })
}

export default createStore
