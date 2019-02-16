<template>
  <div>
    <shopping-carts
      @addToCart="addToCart"
      @minusItem="minusItem"
      @deleteItem="deleteItem"/>
    <div class="container">
      <div class="sidebar float-md-left">
        <div class="header">{{ $route.params.deCategory }}</div>
        <div class="categories">
          <div
            :class="{ 'active' : category === 'all' }"
            class="category"
            @click="changeCategory('all')">所有甜點({{ $store.state.allProducts.length }})</div>
          <div
            :class="{ 'active' : category === 'selected' }"
            class="category"
            @click="changeCategory('selected')">本日精選({{ $store.state.categoriesDetail.selected }})</div>
          <div
            :class="{ 'active' : category === 'recommend' }"
            class="category"
            @click="changeCategory('recommend')">人氣推薦({{ $store.state.categoriesDetail.recommend }})</div>
          <div
            :class="{ 'active' : category === 'newIn' }"
            class="category"
            @click="changeCategory('newIn')">新品上市({{ $store.state.categoriesDetail.newIn }})</div>
        </div>
      </div>
      <product-cards
        :category.sync="category"
        @addToCart="addToCart"/>
        <!-- .sync : could immediately pass the props that has changed to child component  -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import productCards from '~/components/productCards'
import shoppingCarts from '~/components/shoppingCarts'

export default {
  layout: 'mainNav',
  components: { productCards, shoppingCarts },
  asyncData ({ params }) {
    return {
      deCategory: params.deCategory
    }
  },
  data() {
    return {
      category: 'all',
      activeClass: false,
      quantity: 0
    }
  },
  mounted() {
    this.$store.commit('updateCarts')
    this.category = this.$route.params.deCategory
    console.log(this.deCategory)
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
@media (max-width: 767px) {
  .sidebar {
      width: 100%;
      margin: auto;
      margin-bottom: 20px;
  }
}
</style>
