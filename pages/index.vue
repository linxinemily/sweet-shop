<template>
  <div>
    <shopping-carts
      @addToCart="addToCart"
      @minusItem="minusItem"
      @deleteItem="deleteItem"/>
    <section class="hero container">
      <img
        class="hero-img"
        src="https://bit.ly/2OhbMHr">
      <div class="row square-outer">
        <div class="col-md-4 square">
          <nuxt-link to="/shop">
            <div class="text">
              本日精選
            </div>
          </nuxt-link>
        </div>
        <div class="col-md-4 square">
          <div class="text">人氣推薦</div>
        </div>
        <div class="col-md-4 square">
          <div class="text">新品上市</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import shoppingCarts from '~/components/shoppingCarts'
import productCarousel from '~/components/productCarousel'

export default {
  layout: 'mainNav',
  components: {
    shoppingCarts,
    productCarousel,
  },
  mounted() {
    this.$nextTick(function () {
      this.$store.commit('updateCarts')
    })
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
    },
    addToCart(product) {
      this.$store.commit('add_to_cart', product)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
@import 'swiper/dist/css/swiper.css';
</style>
