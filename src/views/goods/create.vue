<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input
          v-model="ruleForm.price"
          @keyup.native="limitInput(ruleForm.price)"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品链接" prop="primary_pic_url">
        <el-input v-model="ruleForm.primary_pic_url"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="stock">
        <el-input
          v-model="ruleForm.stock"
          @keyup.native="limitStockInput(ruleForm.stock)"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="sbmLoading"
          >上架</el-button
        >
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
</style>

<script>
import { createGoods } from '@/api/goods'

export default {
  name: 'GoodsCreate',

  data() {
    const priceValidate = (rule, value, callback) => {
      if (value) {
        if (
          value == 0 ||
          value > 99999
        ) {
          return callback(new Error("商品价格在0.01-99999之间"));
        }
      }
      callback();
    };
    const stockValidate = (rule, value, callback) => {
      if (value) {
        if (
          value < 1 ||
          value > 99999
        ) {
          return callback(new Error("商品库存在1-99999之间"));
        }
      }
      callback();
    };
    return {
      sbmLoading: false,
      ruleForm: {
        name: '',
        desc: '',
        price: undefined,
        primary_pic_url: '',
        stock: undefined,
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { validator: priceValidate },
        ],
        primary_pic_url: [
          { required: true, message: '请输入商品图片链接', trigger: 'blur' },
          { min: 5, max: 999, message: '图片链接不合法', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { validator: stockValidate },
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sbmLoading = true;
          this.ruleForm.price = +this.ruleForm.price;
          this.ruleForm.stock = +this.ruleForm.stock;
          createGoods(this.ruleForm).then(response => {
            this.$notify.success({
              title: '成功',
              message: '商品添加成功'
            })
            this.sbmLoading = false;
            this.$router.push({ path: '/home/goods/list' })
          }).catch(response => {
            this.$notify.error({
              title: '商品添加失败',
              message: response && response.data && response.data.errorMessage
            });
            this.sbmLoading = false;
          })
        } else {
          this.$notify.error({
            title: '验证失败',
            message: 'error submit!!'
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCancel() {
      this.$router.push({ path: '/home/goods/list' })
    },
    limitInput() {
      this.ruleForm.price = this.ruleForm.price && this.ruleForm.price
        .replace(/[^\.\d]/g, "") //清除"数字"和"."以外的字符
        .replace(/^\./g, "") //验证第一个字符是数字而不是.
        .replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的.
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".") //只允许输入一个小数点
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
    },
    limitStockInput() {
      this.ruleForm.stock = this.ruleForm.stock && this.ruleForm.stock
        .replace(/[^\d]/g, "") //清除"数字以外的字符
    }
  }
}
</script>

<style style lang="scss">
</style>
