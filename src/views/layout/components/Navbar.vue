<template>
  <div class="navbar">
    <div></div>

    <div class="right-menu">
      <el-dropdown>
        <el-avatar
          :size="size"
          :src="circleUrl"
          style="top: 8px; position: relative"
        ></el-avatar>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      size: "small",
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  justify-content: space-between;
  .right-menu {
    cursor: pointer;
    margin-right: 10px;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
}
</style>
