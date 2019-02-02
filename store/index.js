import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      allProducts: [],
      carts: [],
      categoriesDetail: {
        selected: 0,
        recommend: 0,
        newIn: 0
      }
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
        let items = []
        if (state.carts !== null) {
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
                // console.log(itemToPush)
                break
              }
            }
          }
          return items
        }
      },
      sum: state => {
        let r = []
        let counter = {}
        if (state.carts != null) {
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
        }

        let num = 0
        for (let i = 0; i < r.length; i++) {
          num += r[i].price * r[i].qty
        }
        return num
      },
      loadedProducts: state => {
        return state.allProducts
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
        //找到相同id的把它刪掉一個
        for (let item of state.carts) {
          if (item.id === product.id) {
            let index = state.carts.indexOf(item)
            state.carts.splice(index, 1)
            break
          }
        }
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
      },
      setCategoriesNum: state => {
        for (let product of state.allProducts) {
          switch (product.category) {
            case '本日精選':
              state.categoriesDetail.selected += 1
              break
            case '人氣推薦':
              state.categoriesDetail.recommend += 1
              break
            case '新品上市':
              state.categoriesDetail.newIn += 1
            default:
              break
          }
        }
      },
      addProduct: (state, post) => {
        state.allProducts.push(post)
      }
    },
    actions: {
      nuxtServerInit(vuexContext) {
        return axios
          .get('https://dessert-shop-emliy.firebaseio.com/products.json')
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key })
            }
            vuexContext.state.allProducts = postsArray
            vuexContext.commit('setCategoriesNum')
          })
      },
      addProduct(vuexContext, product) {
        return axios
          .post(
            'https://dessert-shop-emliy.firebaseio.com/products.json',
            product
          )
          .then(res => {
            console.log(res)
            vuexContext.commit('addProduct', product)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  })
}

export default createStore
