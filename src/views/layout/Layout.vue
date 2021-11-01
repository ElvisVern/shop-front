<template>
  <div class="app-wrapper">
    <div class="menu">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: calc(100vh + 50px)"
      >
        <el-menu-item index="1" @click="gotoIndex()">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="gotoGoods()">
          <i class="el-icon-goods"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="gotoView()">
          <i class="el-icon-shopping-cart-full"></i>
          <span slot="title">商品下单</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {
  },
  methods: {
    gotoIndex() {
      this.$router.push({ path: '/home/dashboard' })
    },
    gotoGoods() {
      this.$router.push({ path: '/home/goods/list' })
    },
    gotoView() {
      this.$router.push({ path: '/home/goods/view' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.menu {
  width: 210px;
  // height: 100vh;
  float: left;
}
</style>
