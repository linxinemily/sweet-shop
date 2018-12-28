<template>
  <div>
    <div
      v-if="clickBtn"
      class="cart-info">
      <p class="title">購物車商品</p>
      <div
        v-for="(product, index) in items"
        :key="index"
        class="d-flex align-items-center item">
        <img
          :src="product.imgUrl"
          class="product-img mr-3">
        <div class="product-info d-flex mr-3">
          <span class="product-name">{{ product.name }}</span>
        </div>
        <div class="products-counters d-flex mr-3">
          <span
            class="product-counter"
            @click="addToCart(product)">+</span>
          <span class="product-number"> {{ product.qty ? product.qty : 1 }}
          </span>
          <span
            class="product-counter"
            @click="minusItem(product)">-</span>
        </div>
        <span class="mr-3">NT $ {{ (product.price)*(product.qty) }} </span>
        <div
          class="delete"
          @click="deleteItem(product)">
          <font-awesome-icon icon="times" />
        </div>
      </div>
      <div class="price-footer d-flex justify-content-around align-items-center">
        <div class="total-price">
          總計： NT $ <span>{{ sum }}</span>
        </div>
        <div class="check-out">結帳去</div>
      </div>
    </div>
    <div
      class="my-cart"
      @click="clickBtn = !clickBtn">
      <div class="number">{{ items_count_in_cart }}</div>
      <font-awesome-icon
        icon="shopping-cart"
        class="fa-lg" />
    </div>
    <div class="container">
      <div class="sidebar float-left">
        <div class="header">甜點類別</div>
        <div class="categories">
          <div
            :class="{ 'active' : category === 'all' }"
            class="category"
            @click="changeCategory('all')">所有甜點{{ $store.state.counter }}({{ products.length }})</div>
          <div
            :class="{ 'active' : category === 'selected' }"
            class="category"
            @click="changeCategory('selected')">本日精選({{ selected.length }})</div>
          <div
            :class="{ 'active' : category === 'recommend' }"
            class="category"
            @click="changeCategory('recommend')">人氣推薦({{ recommend.length }})</div>
          <div
            :class="{ 'active' : category === 'newIn' }"
            class="category"
            @click="changeCategory('newIn')">新品上市({{ newIn.length }})</div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="product in filtered"
          :key="product.id"
          class="col-md-6 products">
          <div class="product">
            <div class="special">{{ product.category }}</div>
            <div class="img-outer">
              <div class="img-inner">
                <div
                  :style="{ 'background-image' : 'url(\'' + product.imgUrl + '\')' }"
                  class="img" />
              </div>
            </div>
            <div class="detail d-flex justify-content-between">
              <div class="name">{{ product.name }}</div>
              <div class="price">NT $ {{ product.price }}</div>
            </div>
            <div
              class="add"
              @click="addToCart(product)">加入購物車</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'mainNav',
  data() {
    return {
      products: [],
      category: 'all',
      selected: [],
      recommend: [],
      newIn: [],
      all: [],
      activeClass: false,
      clickBtn: false,
      quantity: 0
    }
  },
  computed: {
    ...mapGetters(['items_count_in_cart', 'items', 'sum']),
    filtered() {
      let arr = []
      if (this.products.length <= 0) {
        return this.products
      }

      if (this.category === 'selected') {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === '本日精選') {
            arr.push(this.products[i])
          }
        }
      } else if (this.category === 'recommend') {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === '人氣推薦') {
            arr.push(this.products[i])
          }
        }
      } else if (this.category === 'newIn') {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].category === '新品上市') {
            arr.push(this.products[i])
          }
        }
      } else {
        return this.products
      }
      return arr
    }
  },
  asyncData({ params }) {
    return axios.get('http://localhost:3003/products').then(res => {
      return { products: res.data }
    })
  },
  mounted() {
    this.$store.commit('updateCarts')
    // axios
    //   .get('http://localhost:3003/products')
    //   .then(response => {
    //     this.products = response.data
    //     console.log(this.products)
    //     let arr = []
    //     for (let i = 0; i < this.products.length; i++) {
    //       switch (this.products[i].category) {
    //         case '本日精選':
    //           this.selected.push(this.products[i])
    //           console.log(this.selected)
    //           break
    //         case '人氣推薦':
    //           this.recommend.push(this.products[i])
    //           break
    //         case '新品上市':
    //           this.newIn.push(this.products[i])
    //           break
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log('error!')
    //   })
  },
  methods: {
    changeCategory(categoryName) {
      this.category = categoryName
    },
    addToCart(product) {
      this.$store.commit('add_to_cart', product)
    },
    minusItem(item) {
      this.$store.commit('minus_item', item)
    },
    deleteItem(item) {
      this.$store.commit('delete_item', item)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
.products {
  .product {
    margin: 0 !important;
    margin-bottom: 30px !important;
  }
}
.sidebar {
  width: 300px;
  font-size: 20px;
  letter-spacing: 2px;
  .header {
    background-color: $color-primary;
    color: $color-white;
    padding: 16px 0;
    text-align: center;
  }
  .categories {
    border: 1px solid $color-lighter;
    .category {
      padding: 16px 0;
      border-bottom: 1px solid $color-lighter;
      color: $color-primary;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: $color-lighter;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .active {
    background-color: $color-lighter;
  }
}
.my-cart {
  position: fixed;
  right: 20px;
  bottom: 20px;
  color: $color-white;
  background-color: $color-primary;
  padding: 20px;
  border-radius: 60px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  .number {
    position: absolute;
    top: -4px;
    right: 0;
    background-color: rgb(228, 67, 110);
    width: 25px;
    height: 25px;
    border-radius: 25px;
    color: $color-white;
    text-align: center;
    line-height: 25px;
  }
}
.cart-info {
  position: fixed;
  max-height: 500px;
  min-width: 400px;
  overflow-y: auto;
  background: $color-white;
  border-radius: none;
  right: 30px;
  bottom: 100px;
  z-index: 10;
  color: $color-primary;
  box-shadow: 2px 2px 4px rgba(63, 93, 69, 0.05),
    2px 2px 10px rgba(0, 0, 0, 0.1);
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
  .product-name {
    display: block;
    font-size: 1rem;
    font-weight: 400;
  }
  .product-counter,
  .product-number {
    display: block;
    background-color: $color-lighter;
    width: 30px;
    height: 30px;
    border: 1px solid $color-lighter;
    text-align: center;
  }
  .product-number {
    background-color: $color-white;
  }
  .delete {
    width: 20px;
    height: 20px;
    background: $color-lighter;
    color: $color-light;
    border-radius: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
  }
}
.item {
  padding: 10px 30px;
  border-bottom: 1px dashed $color-lighter;
  &:last-child {
    border-bottom: none;
  }
}
.title {
  font-weight: 600;
  color: $color-white;
  text-align: center;
  font-size: 1.2rem;
  padding: 15px 0;
  background: $color-primary;
}
.price-footer {
  padding: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 1.1rem;
  .check-out {
    padding: 8px 16px;
    border-radius: 2px;
    background-color: $color-secondary;
    color: #000000;
    font-weight: 600;
    box-shadow: 0 3px 10px rgba(147, 129, 75, 0.2);
  }
}
</style>
