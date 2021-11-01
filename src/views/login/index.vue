<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">后台系统登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          placeholder="管理员账户"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          tabindex="2"
          show-password
          placeholder="管理员密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="info"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('管理员密码长度应大于6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'than',
        password: 'ElvisVern11'
      },
      codeImg: '',
      loginRules: {
        username: [{ required: true, message: '管理员账户不允许为空', trigger: 'blur' }],
        password: [
          { required: true, message: '管理员密码不允许为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/home/dashboard' })
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response && response.data && response.data.errorMessage
            })
            this.loading = false
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: rgb(84, 92, 100);
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>

