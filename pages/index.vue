<template>
  <div>
    <section class="hero container">
      <img
        class="hero-img"
        src="https://bit.ly/2OhbMHr">
      <div class="row square-outer">
        <div class="col-md-4 square">
          <nuxt-link to="/shop">
            <div class="text">
              本日精選
            </div>
          </nuxt-link>
        </div>
        <div class="col-md-4 square">
          <div class="text">人氣推薦</div>
        </div>
        <div class="col-md-4 square">
          <div class="text">新品上市</div>
        </div>
      </div>
    </section>
    <section class="whyDesserts container-fluid">
      <div class="container">
        <img
          src="https://bit.ly/2Dwoxd7"
          class="content-img">
        <div class="row">
          <div class="col-md-6" />
          <div class="col-md-6 d-flex justify-content-md-end align-items-md-start">
            <div class="text">是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。<br>是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。</div>
            <img
              src="../assets/images/lg-為什麼選擇了做甜點.svg"
              class="slogan">
          </div>
        </div>
      </div>
    </section>
    <section class="whyDesserts container-fluid">
      <div class="container">
        <img
          src="https://bit.ly/2zzAQS4"
          class="content-img right">
        <div class="row">
          <div class="col-md-6 d-flex justify-content-md-end align-items-md-start">
            <div class="text">是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。<br>是非成敗轉頭空，滾滾長江東逝水，<br>白髮漁樵江渚上，古今多少事，都付笑談中。</div>
            <img
              src="../assets/images/lg-為什麼一定要吃甜點.svg"
              class="slogan">
          </div>
          <div class="col-md-6" />
        </div>
      </div>
    </section>
    <section class="d-flex justify-content-center align-items-center pt-4 pb-4">
      <img
        src="../assets/images/lg-想吃甜點是不需要理由的.svg"
        class="slogan">
    </section>
    <section class="products container">
      <div class="row">
        <div class="col-md-4">
          <div class="product">
            <div class="special">本日精選</div>
            <div class="img-outer">
              <div class="img-inner">
                <div
                  class="img"
                  style="background-image:url('https://bit.ly/2zBjQuq')"/>
              </div>
            </div>
            <div class="detail d-flex justify-content-between">
              <div class="name">焦糖馬卡龍</div>
              <div class="price">NT$ 450</div>
            </div>
            <div class="add">加入購物車</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="product">
            <div class="special">本日精選</div>
            <div class="img-outer">
              <div class="img-inner">
                <div
                  class="img"
                  style="background-image:url('https://bit.ly/2zBDAxX')"/>
              </div>
            </div>
            <div class="detail d-flex justify-content-between">
              <div class="name">焦糖馬卡龍</div>
              <div class="price">NT$ 450</div>
            </div>
            <div class="add">加入購物車</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="product">
            <div class="special">本日精選</div>
            <div class="img-outer">
              <div class="img-inner">
                <div
                  class="img"
                  style="background-image:url('https://bit.ly/2QbVsVR')"/>
              </div>
            </div>
            <div class="detail d-flex justify-content-between">
              <div class="name">焦糖馬卡龍</div>
              <div class="price">NT$ 450</div>
            </div>
            <div class="add">加入購物車</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

// icon 要使用的標籤名稱 <font-awesome-icon>
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { faArrowRight as ArrowRight_SolidIcon } from '@fortawesome/free-solid-svg-icons'
library.add(ArrowRight_SolidIcon)
import { faEnvelope as faEnvelope_SolidIcon } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope_SolidIcon)

Vue.config.productionTip = false

export default {
  layout: 'mainNav'
}
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
</style>
