<template>
  <div class="container d-flex justify-content-center">
    <div class="form-outer">
      <h3 class="mb-4">管理員{{ isLogin ? '登入' : '註冊' }}</h3>
      <div class="logOrSignForm">
        <form @submit.prevent="onSubmit">
          <input
            type="text"
            placeholder="您的帳號"
            v-model="email">
          <input
            type="password"
            placeholder="您的密碼"
            v-model="password">
          <button type="submit">{{ isLogin ? '登入' : '註冊' }}</button>
          <span
            class="change-text"
            @click="isLogin = !isLogin">我要{{ isLogin ? '註冊' : '登入' }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mainNav',
  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
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
    }
  }
}
.form-outer {
  background-color: $color-primary;
  padding: 40px;
  margin-bottom: 40px;
  h3 {
    text-align: center;
    color: $color-lighter;
  }
}
.change-text {
  color: #fff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
