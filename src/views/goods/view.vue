<template>
  <div class="container">
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="listQuery.filter"
            clearable
            class="filter-item"
            style="width: 160px"
            placeholder="请输入商品名称"
            @change="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSubmit"
            :loading="searchBtnLoading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-row> </el-row>
    </div>
    <el-row>
      <el-col
        style="margin: 0 20px 20px 0; width: 210px"
        :span="8"
        v-for="(o, index) in list"
        :key="o.id"
        :offset="index > 0 ? 1 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <el-image :src="o.primary_pic_url" class="image">
            <div slot="error" class="image-slot"></div>
          </el-image>
          <div style="padding: 14px">
            <el-tooltip
              class="item"
              effect="dark"
              :content="o.name"
              placement="top"
            >
              <span class="name overflow-ellipsis-more">{{ o.name }}</span>
            </el-tooltip>

            <div class="bottom clearfix">
              <el-tooltip
                class="item"
                effect="dark"
                :content="o.goods_desc"
                placement="bottom"
              >
                <span class="desc overflow-ellipsis-more">{{
                  o.goods_desc
                }}</span>
              </el-tooltip>

              <el-button
                type="text"
                class="button"
                @click="handleOrder(o.goods_id)"
                :disabled="o.stock == 0"
              >
                <span class="stock">库存: {{ o.stock }}</span>
                下单</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>

      <el-empty :image-size="200" v-if="list.length == 0"></el-empty>
    </el-row>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listGoods } from '@/api/goods'
import Pagination from '@/components/Pagination'
import { createOrder } from '@/api/order'

export default {
  name: 'GoodsView',
  components: { Pagination },
  data() {
    return {
      list: [],
      listLoading: false,
      searchBtnLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        filter: null
      },
      total: 0,

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
    handleSubmit() {
      this.getList();
    },
    handleOrder(goods_id) {
      this.$confirm('是否确认下单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createOrder({ goods_id }).then(() => {
          this.$message({
            type: 'success',
            message: '下单成功!'
          });
          this.getList();
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: 'error',
            message: `下单失败!!  --- ${error && error.data && error.data.errorMessage}`
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下单'
        });
      });
    }
  }
}
</script>

<style lang="scss">
.name {
  max-width: 120px;
}
.overflow-ellipsis-more {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  .desc {
    display: inline-block;
    min-width: 90px;
    font-size: 12px;
    color: #8b988b;
  }
  .stock {
    font-size: 12px;
    color: #8b988b;
  }
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  height: 204px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>