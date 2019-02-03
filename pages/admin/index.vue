<template>
  <div>
    <div class="admin-head d-flex justify-content-between">
      <h3 class="admin-title">商品管理</h3>
      <button
        class="btn-primary"
        @click="addNewProduct">新增商品</button>
    </div>
    <div
      v-if="onAdd === true"
      class="add-new-form d-flex justify-content-center align-items-center">
      <div class="form-content">
        <admin-form
          @onSubmit="submitNewProduct"
          @cancel="onAdd = false" />
      </div>
    </div>
    <div
      v-if="onEdit === true"
      class="add-new-form d-flex justify-content-center align-items-center">
      <div class="form-content">
        <admin-form
          :product="editingProduct"
          form-title="編輯商品"
          @onSubmit="submitEditedProduct"
          @cancel="onEdit = false"/>
      </div>
    </div>
    <div class="products-table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">商品編號</th>
            <th scope="col">商品照片</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品價格</th>
            <th scope="col">商品分類</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in loadedProducts"
            :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td><img :src="product.imgUrl"></td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td>
              <button @click="isEditing(product)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminForm from '~/components/adminForm'
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    adminForm
  },
  layout: 'admin',
  data() {
    return {
      onAdd: false,
      onEdit: false,
      editingProduct: {}
    }
  },
  computed: {
    ...mapGetters(['loadedProducts'])
  },
  methods: {
    addNewProduct() {
      this.onAdd = true
    },
    isEditing(product) {
      this.onEdit = true
      this.editingProduct = product
    },
    submitNewProduct(editedProduct) {
      if (!editedProduct.name || !editedProduct.price) {
        console.log('plz fill in!!')
        this.errEmIsActive = true
        return
      }
      this.$store.dispatch('addProduct', editedProduct).then(() => {
        this.onAdd = false
      })
    },
    submitEditedProduct(editedProduct) {
      this.$store.dispatch('editProduct', editedProduct).then(() => {
        this.onEdit = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.products-table {
  margin-top: 20px;
  background-color: #fff;
}
.admin-title {
  font-weight: 500;
  letter-spacing: 2px;
  color: $color-primary;
}
.add-new-form {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.form-content {
  background: #fff;
  width: 600px;
  border-radius: 4px;
  max-height: 600px;
  overflow-y: auto;
}
.products-table img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
}
.table th,
.table td {
  vertical-align: middle;
  text-align: center;
}
</style>
