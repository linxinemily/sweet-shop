import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'
import { request } from 'http'

const createStore = () => {
  return new Vuex.Store({
    state: {
      allProducts: [],
      carts: [],
      categoriesDetail: {
        selected: 0,
        recommend: 0,
        newIn: 0
      },
      token: null
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
      },
      isAuthenticate(state) {
        return state.token != null
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
      addProduct: (state, product) => {
        state.allProducts.push(product)
      },
      editedProduct: (state, editedProduct) => {
        for (let product of state.allProducts) {
          if (product.id === editedProduct.id) {
            product = editedProduct
            break
          }
        }
      },
      deleteProduct: (state, editedProduct) => {
        let productIndex = state.allProducts.findIndex(
          product => product.id === editedProduct.id
        )
        state.allProducts.splice(productIndex, 1)
      },
      setToken: (state, token) => {
        state.token = token
      },
      clearToken: state => {
        state.token = null
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
            `https://dessert-shop-emliy.firebaseio.com/products.json?auth=${
              vuexContext.state.token
            }`,
            product
          )
          .then(result => {
            vuexContext.commit('addProduct', {
              ...product,
              id: result.data.name
            })
          })
          .catch(e => {
            console.log(e)
          })
      },
      editProduct(vuexContext, editedProduct) {
        return axios
          .put(
            `https://dessert-shop-emliy.firebaseio.com/products/${
              editedProduct.id
            }.json?auth=${vuexContext.state.token}`,
            editedProduct
          )
          .then(res => {
            vuexContext.commit('editedProduct', editedProduct)
          })
          .catch(e => {
            console.log(e)
          })
      },
      deleteProduct(vuexContext, editedProduct) {
        return axios
          .delete(
            `https://dessert-shop-emliy.firebaseio.com/products/${
              editedProduct.id
            }.json?auth=${vuexContext.state.token}`
          )
          .then(res => {
            console.log(res)
            console.log('已經刪除' + editedProduct.name)
            vuexContext.commit('deleteProduct', editedProduct)
          })
          .catch(e => {
            console.log(e)
          })
      },
      authenticateUser(vuexContext, authData) {
        let url =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyChazks0tpd0w9eZ37qRkVfXLyXmliVOsY'
        if (!authData.isLogin) {
          url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyChazks0tpd0w9eZ37qRkVfXLyXmliVOsY'
        }
        return axios
          .post(url, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            vuexContext.commit('setToken', res.data.idToken)
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(res.data.expiresIn) * 1000
            )
            Cookie.set('jwt', res.data.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(res.data.expiresIn) * 1000
            )
            console.log(res)
          })
      },
      initAuth(vuexContext, req) {
        let token
        let expirationDate
        console.log(req)
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(e => e.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(e => e.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('no token or invalid token')
          return
        }
        console.log('token:' + token)
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    }
  })
}

export default createStore
