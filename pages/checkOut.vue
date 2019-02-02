<template>
  <div class="container">
    <div class="d-flex">
      <div class="productList mb-5">
        <div class="title text-center">您的購物車</div>
        <div class="items mb-4 mt-4">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="item d-flex justify-content-between align-items-center">
            <img :src="item.imgUrl">
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="singlePrice">{{ item.price }}</div>
            </div>
            <div class="products-counters d-flex mr-3">
              <span
                class="product-counter"
                @click="addToCart(item)">+</span>
              <span class="product-number">{{ item.qty }}</span>
              <span
                class="product-counter"
                @click="minusItem(item)">-</span>
            </div>
            <div class="allPrice">{{ item.qty * item.price }}</div>
            <div
              class="delete"
              @click="deleteItem(product)">
              <font-awesome-icon icon="times" />
            </div>
          </div>
        </div>
      </div>
      <div class="checkOutBox">
        <div class="title text-center">
          訂單摘要
        </div>
        <div class="content">
          <div class="detail d-flex justify-content-between">
            <div>小計</div>
            <div>NT$ {{ sum }}</div>
          </div>
          <div class="detail d-flex justify-content-between mb-3">
            <div>運費</div>
            <div>NT$ 80</div>
          </div>
          <div class="total d-flex justify-content-between">
            <div>總計</div>
            <div>NT$ {{ sum + 80 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'mainNav',
  computed: {
    ...mapGetters(['items_count_in_cart', 'items', 'sum'])
  },
  mounted() {
    this.$store.commit('updateCarts')
  },
  methods: {
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
//購物車
.productList {
  width: calc(100% - 300px);
  margin-right: 20px;
  color: $color-primary;
  .title {
    background-color: $color-lighter;
    height: 65px;
    line-height: 65px;
    font-weight: 600;
    color: $color-primary;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  img {
    width: 110px;
    height: 110px;
    object-fit: cover;
  }
  .info {
    .name {
      font-size: 1.1rem;
    }
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
  .allPrice {
    font-size: 1.1rem;
    font-weight: 600;
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
//訂單摘要
.checkOutBox {
  width: 300px;
  .content {
    background-color: $color-lighter;
    padding: 30px;
    .detail {
      padding: 4px 0;
    }
    .total {
      font-weight: 600;
      font-size: 1.1rem;
      padding-top: 20px;
      border-top: 1px solid $color-light;
    }
  }
  .title {
    color: $color-white;
    background-color: $color-primary;
    height: 65px;
    line-height: 65px;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
}
</style>
