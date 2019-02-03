<template>
  <div style="position:relative;">
    <div class="form-head">
      <h3 class="form-title">{{ formTitle }}</h3>
    </div>
    <div class="form-body">
      <div class="row">
        <div class="col-md-3">
          <input
            ref="file"
            type="file"
            name="file"
            style="display:none;"
            @change="handleFileUpload">
          <button @click="$refs.file.click()">選擇圖片</button>
          <button @click="onSubmit">上傳圖片</button>
          <div
            v-show="editedProduct.imgUrl"
            class="img-outer">
            <img :src="editedProduct.imgUrl">
            <button @click="deleteImg">刪除圖片</button>
          </div>
        </div>
        <div class="col-md-9">
          <form @submit.prevent="onSubmitForm()">
            <div class="input-outer">
              <label for="name">商品名稱</label>
              <input
                v-model="editedProduct.name"
                type="text">
              <small
                v-if="missingName && attemptSubmit"
                class="error">請輸入商品名稱</small>
            </div>
            <div class="input-outer">
              <label for="name">商品價格</label>
              <input
                v-model="editedProduct.price"
                type="text">
              <small
                v-if="missingPrice && attemptSubmit"
                class="error">請輸入商品價格</small>
              <small
                v-if="myIsNaN && attemptSubmit"
                class="error" >請輸入數字</small>
            </div>
            <div class="input-outer">
              <label for="name">商品分類</label>
              <select
                v-model="editedProduct.category">
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category">{{ category }}</option>
              </select>
            </div>
            <input
              v-model="editedProduct.imgUrl"
              type="hidden">
            <div class="d-flex justify-content-end">
              <input
                type="submit"
                value="完成"
                class="btn-send btn-primary">
            </div>
          </form>
        </div>
      </div>
    </div>
    <button
      class="btn-cancel"
      @click="cancel"><font-awesome-icon icon="times" /></button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// icon 要使用的標籤名稱 <font-awesome-icon>
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  props: {
    product: {
      type: Object,
      require: false,
      default: () => {}
    },
    formTitle: {
      type: String,
      default: '新增商品'
    }
  },
  data() {
    return {
      file: '',
      imgDeleteHash: '',
      categories: ['新品上市', '人氣推薦', '本日精選'],
      editedProduct: this.product
        ? this.product
        : {
            name: '',
            price: null,
            category: '新品上市',
            imgUrl: this.imgUrl ? this.imgUrl : null
          },
      attemptSubmit: false
    }
  },
  computed: {
    missingName() {
      return this.editedProduct.name === ''
    },
    missingPrice() {
      return this.editedProduct.price === ''
    },
    myIsNaN() {
      return isNaN(parseInt(this.editedProduct.price))
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    onSubmit() {
      let apiUrl = 'https://api.imgur.com/3/image'
      let apiKey = '034ce93106a9f57'
      let formData = new FormData()
      formData.append('image', this.file)
      formData.append('title', 'test')
      formData.append('description', 'test')
      axios({
        method: 'POST',
        url: apiUrl,
        data: formData,
        headers: {
          Authorization: 'Client-ID ' + apiKey
        },
        mimeType: 'multipart/form-data'
      })
        .then(res => {
          this.imgDeleteHash = res.data.data.deletehash
          this.editedProduct.imgUrl = res.data.data.link
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteImg() {
      let apiKey = '034ce93106a9f57'
      axios({
        method: 'DELETE',
        url: 'https://api.imgur.com/3/image/' + this.imgDeleteHash,
        headers: {
          Authorization: 'Client-ID ' + apiKey
        },
        timeout: 0
      })
        .then(res => {
          console.log(res)
          alert('刪除照片成功！')
        })
        .catch(e => {
          console.log(e)
        })
    },
    onSubmitForm(event) {
      this.attemptSubmit = true
      if (this.missingName || this.missingPrice || this.myIsNaN) {
        event.preventDefault()
      }
      this.$emit('onSubmit', this.editedProduct)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.img-outer img {
  width: 100%;
}

.form-head {
  background-color: $color-primary;
  .form-title {
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 2px;
    color: $color-white;
    padding: 20px;
    margin-bottom: 0;
  }
}
.form-body {
  padding: 40px;
  position: relative;
  max-height: 600px;
  overflow-y: auto;
}
.btn-send {
  bottom: 20px;
  right: 20px;
  border: 0;
  &:hover {
    background-color: $color-light;
  }
}
.btn-cancel {
  position: absolute;
  background: none;
  color: rgba(0, 0, 0, 0.3);
  font-size: 30px;
  border: 0;
  right: 10px;
  top: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: rgba(256, 256, 256, 0.3);
  }
}
.input-outer {
  margin-bottom: 20px;
  label {
    color: $color-primary;
    letter-spacing: 1px;
    font-size: 1.2rem;
    font-weight: 500;
  }
  input {
    display: block;
    width: 100%;
    padding: 8px;
    outline: none;
  }
}
.error {
  color: red;
}
</style>
