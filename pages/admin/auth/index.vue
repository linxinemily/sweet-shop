<template>
  <div class="container d-flex justify-content-center bg-image">
    <div class="form-outer">
      <h3 class="mb-4">管理員{{ isLogin ? '登入' : '註冊' }}</h3>
      <div class="logOrSignForm">
        <form
          class="text-center"
          @submit.prevent="onSubmit">
          <input
            type="text"
            placeholder="您的帳號"
            value="test@test.com"
            v-model="email">
          <input
            type="password"
            value="aa23927100"
            placeholder="您的密碼"
            v-model="password">
          <button
            type="submit"
            class="btn-primary mb-2">{{ isLogin ? '登入' : '註冊' }}</button>
          <p
            v-if="showErr"
            class="errMeg">帳號或密碼有誤，請重新輸入</p>
          <span
            class="change-text"
            @click="isLogin = !isLogin">我要{{ isLogin ? '註冊' : '登入' }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'mainNav',
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
  computed: {
    showErr() {
      return this.$store.state.showErr
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('authenticateUser', {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      }).then(res => {
        this.$router.push('/admin')
      }).catch(e => {
        return
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/main.scss';
.logOrSignForm {
  form {
    input{
      display: block;
      height: 40px;
      width: 100%;
      background-color: transparent;
      border: 0;
      background-color: $color-lighter;
      margin-bottom: 20px;
      padding: 4px 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
      border-radius: 4px;
      &:focus {
        outline: none;
      }
    }
    .btn-primary {
      width: 100%;
    }
  }
}
.form-outer {
  width: 30%;
  @include phone-width {
    width: 80%;
  }
  h3 {
    text-align: center;
    color: $color-primary;
  }
}
.change-text {
  color: $color-primary;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.bg-image {
  width: 100%;
  background-image: url('https://bit.ly/2P7GhNd');
  background-size: cover;
  background-position: center;
  padding: 140px 0;
}
.errMeg {
  color: red;
}
</style>
