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
    <section class="whyDesserts container-fluid">
      <div class="container">
        <img
          src="https://bit.ly/2Dwoxd7"
          class="content-img">
        <div class="row">
          <div class="col-md-6" />
          <div class="col-md-6 d-flex justify-content-md-end align-items-md-start">
            <div class="text">是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。<br>是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。</div>
            <img
              src="../assets/images/lg-為什麼選擇了做甜點.svg"
              class="slogan">
          </div>
        </div>
      </div>
    </section>
    <section class="whyDesserts container-fluid">
      <div class="container">
        <img
          src="https://bit.ly/2zzAQS4"
          class="content-img right">
        <div class="row">
          <div class="col-md-6 d-flex justify-content-md-end align-items-md-start">
            <div class="text">是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。<br>是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。</div>
            <img
              src="../assets/images/lg-為什麼一定要吃甜點.svg"
              class="slogan">
          </div>
          <div class="col-md-6" />
        </div>
      </div>
    </section>
    <section class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <img
        src="../assets/images/lg-想吃甜點是不需要理由的.svg"
        class="slogan">
    </section>
    <section class="products container">
      <product-carousel
        :threeCol="true"
        @addToCart="addToCart" />
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
