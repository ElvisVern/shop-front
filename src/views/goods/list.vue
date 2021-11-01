<template>
  <div class="container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        :loading="searchBtnLoading"
        >刷新</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >添加</el-button
      >
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="商品ID" prop="id" />

      <el-table-column align="center" label="名称" prop="name" />

      <el-table-column align="center" label="描述" prop="goods_desc" />

      <el-table-column align="center" label="价格" prop="price" />

      <el-table-column align="center" label="库存" prop="stock" />

      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.primary_pic_url"
            :preview-src-list="toPreview(scope.row, scope.row.primary_pic_url)"
            style="width: 40px; height: 40px"
          />
        </template>
      </el-table-column>

      <el-table-column key="desc" label="操作" prop="handle">
        <template slot-scope="scope">
          <el-button
            type="text"
            class="edit-btn"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<style>
</style>

<script>
import { listGoods, deleteGoods } from '@/api/goods'
import Pagination from '@/components/Pagination'
import { toPreview } from '@/utils/index'

export default {
  name: 'GoodsList',
  components: { Pagination },
  data() {
    return {
      searchBtnLoading: false,
      toPreview,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.searchBtnLoading = true
      listGoods(this.listQuery).then(response => {
        this.list = response.data.resultData.data
        this.total = response.data.resultData.meta.total
        this.listLoading = false
        this.searchBtnLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
        this.searchBtnLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.$router.push({ path: '/home/goods/create' })
    },

    handleDelete(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods({ id: row.id }).then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errorMessage
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
}
</script>
