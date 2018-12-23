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
        return state.carts.length
      },
      items: state => {
        let productsArr = JSON.parse(sessionStorage.getItem('products'))
        if (productsArr !== null) {
          const result = [
            ...new Set(productsArr.map(item => JSON.stringify(item)))
          ].map(item => JSON.parse(item))
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
      add_to_cart: (state, product) => {
        state.carts.push(product)
        let productsStr = JSON.stringify(state.carts)
        sessionStorage.setItem('products', productsStr)
        if (!product.qty) {
          product.qty = 1
        } else {
          product.qty += 1
        }
      },
      minus_item: (state, product) => {
        let index = state.carts.indexOf(product)
        state.carts.splice(index, 1)
        product.qty -= 1
      },
      delete_item: (state, product) => {
        //把carts裡面和傳進來這個product相同的item都刪掉
        let r = state.carts.filter(function(element) {
          return element !== product //true的話就丟進去
        })
        state.carts = r
        product.qty = 0
        console.log(product)
      }
    }
  })
}

export default createStore
