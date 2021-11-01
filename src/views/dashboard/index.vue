<template>
  <div class="container">
    <el-descriptions title="个人信息" class="info">
      <el-descriptions-item label="用户名">{{ username }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ mobile }}</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">管理员</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { getUser } from '@/utils/auth'

export default {
  data() {
    return {
      username: '',
      mobile: '',
    }
  },
  created() {
    const r = getUser()
    const user = JSON.parse(r)
    if (user) {
      this.username = user.name
      this.mobile = user.mobile
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  height: 100vh;
  padding: 20px;
  background-color: rgb(240, 242, 245);
  .info {
    background: #fff;
    padding: 20px;
  }
}
</style>