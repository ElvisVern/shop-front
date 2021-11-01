<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="商品ID" prop="id" />

      <el-table-column
        align="center"
        min-width="100"
        label="名称"
        prop="name"
      />

      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.primary_pic_url"
            :preview-src-list="toPreview(scope.row, scope.row.primary_pic_url)"
            style="width: 40px; height: 40px"
          />
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
import { listGoods } from '@/api/goods'
import Pagination from '@/components/Pagination'
import { toPreview } from '@/utils/index'

export default {
  name: 'GoodsList',
  components: { Pagination },
  data() {
    return {
      toPreview,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: 'add_time',
        order: 'desc'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listGoods(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>
