<template>
  <div style="overflow:hidden;">
    <div class="sideBar">
      <div class="img-logo">
        <img src="../assets/images/logo-light.svg">
      </div>
      <ul class="admin-nav">
        <li>商品管理</li>
        <li>訂單管理</li>
      </ul>
    </div>
    <nuxt class="content"/>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.img-logo {
  padding: 40px 20px;
  text-align: center;
  img {
    width: 100px;
  }
}
.sideBar {
  width: 250px;
  min-height: 100vh;
  background-color: $color-primary;
  position: fixed;
  left: 0;
}
.content {
  margin-left: 250px;
  border-radius: 4px;
  padding: 30px;
  background-color: #f2f2f2;
  min-height: 100vh;
}
.admin-nav {
  list-style-type: none;
  padding: 0;
  li {
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid rgba(141, 162, 145, 0.3);
    color: $color-white;
  }
  li:first-child {
    border-top: 1px solid rgba(141, 162, 145, 0.3);
  }
}
</style>
