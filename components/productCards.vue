<template>
  <div class="row">
    <div
      v-for="(product, index) in filtered"
      :key="index"
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
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    category: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    ...mapGetters(['loadedProducts']),
    filtered() {
      let arr = []
      if (this.loadedProducts.length <= 0) {
        return this.loadedProducts
      }

      if (this.category === 'selected') {
        for (let i = 0; i < this.loadedProducts.length; i++) {
          if (this.loadedProducts[i].category === '本日精選') {
            arr.push(this.loadedProducts[i])
          }
        }
      } else if (this.category === 'recommend') {
        for (let i = 0; i < this.loadedProducts.length; i++) {
          if (this.loadedProducts[i].category === '人氣推薦') {
            arr.push(this.loadedProducts[i])
          }
        }
      } else if (this.category === 'newIn') {
        for (let i = 0; i < this.loadedProducts.length; i++) {
          if (this.loadedProducts[i].category === '新品上市') {
            arr.push(this.loadedProducts[i])
          }
        }
      } else {
        return this.loadedProducts
      }
      return arr
    }
  },
  methods: {
    addToCart(product) {
      this.$emit('addToCart', product)
    }
  }
}
</script>
