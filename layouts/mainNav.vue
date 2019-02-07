<template>
  <div>
    <nav class="navbar navbar-expand-lg container">
      <nuxt-link
        class="navbar-brand"
        to="/">
        <img src="../assets/images/logo-all-dark.svg">
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a
              class="nav-link"
              @click.prevent="$router.push('/')">首頁 <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click.prevent="$router.push('/shop')">商店</a>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              to="/admin">後台管理</nuxt-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click.prevent="$router.push('/checkOut')">
              <font-awesome-icon icon="shopping-cart" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt/>
    <section class="subscribe container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-6 d-flex align-items-md-center justify-content-center">
            <img
              src="../assets/images/logo-light.svg">
            <span>訂閱你我的甜蜜郵件</span>
          </div>
          <div class="col-md-6 d-flex align-items-center email">
            <span class="envelope"><font-awesome-icon icon="envelope" /></span><input type="text"><a href="#"><font-awesome-icon icon="arrow-right" /></a>
          </div>
        </div>
      </div>
    </section>
    <footer class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img
              src="../assets/images/logotype-sm-dark.svg"
              class="logo">
            <div class="text">
              07-1234-5678<br>sweetaste@email.com<br>800 高雄市新興區幸福路 520 號
            </div>
          </div>
          <div class="col-md-6 d-flex justify-content-end">
            <img
              src="../assets/images/sm-今天是個吃甜點的好日子.svg"
              class="slogan">
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <img
              src="../assets/images/ic-line@.svg"
              class="social-icon">
            <img
              src="../assets/images/ic-facebook.svg"
              class="social-icon">
          </div>
          <div class="col-md-6 d-flex justify-content-md-end mt-2">© 2018 Sweetaste* All Rights Reserved</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/main.scss';
.navbar {
  background-color: $color-white;
}
.navbar-brand {
  img {
    width: 100%;
    @include phone-width {
      width: 150px;
    }
  }
}
.nav-item {
  padding: 40px 30px;
  a {
    color: $color-primary;
    font-weight: 600;
  }
}
.nav-link {
  cursor: pointer;
  color: $color-primary !important;
}
.nav-link:hover {
  color: $color-light !important;
}
</style>
