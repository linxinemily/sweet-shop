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
        <div
          class="check-out"
          @click="$router.push('/checkOut')">結帳去</div>
      </div>
    </div>
    <div
      class="my-cart"
      @click="clickBtn = !clickBtn">
      <div
        class="number"
        v-if="items_count_in_cart">{{ items_count_in_cart }}</div>
      <font-awesome-icon
        icon="shopping-cart"
        class="fa-lg" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      clickBtn: false
    }
  },
  computed: {
    ...mapGetters(['items_count_in_cart', 'items', 'sum'])
  },
  methods: {
    addToCart(product) {
      this.$emit('addToCart', product)
    },
    minusItem(product) {
      this.$emit('minusItem', product)
    },
    deleteItem(product) {
      this.$emit('deleteItem', product)
    }
  }
}
</script>

<style lang="scss">
.my-cart {
  z-index: 1000;
}
</style>
