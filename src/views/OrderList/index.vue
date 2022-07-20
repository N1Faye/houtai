<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable
            @keyup.enter.native="search"
            @clear="search"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-table :data="ordersList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="179">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="179">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款" width="179">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.order_pay === '0' ? 'success' : 'danger'"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              {{ scope.row.order_pay === "0" ? "已支付" : "未支付" }}
            </el-button></template
          >
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="179">
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="179">
          <template slot-scope="scope">
            {{
              $dayjs(Number(scope.row.create_time * 1000)).format("YYYY-MM-DD")
            }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i></el-button
          ></template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page.sync="pagenum"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 编辑收获地址 -->
    <el-dialog
      title="修改收获地址"
      :visible.sync="dialogEdit"
      @close="handleColse"
    >
      <el-form :model="addressForm" ref="addressForm">
        <el-form-item>
          <el-cascader
            :value="addressValue"
            :options="cityOptions"
            change-on-select
            ref="addressCascader"
            :props="{ expandTrigger: 'hover', checkStrictly: 'false' }"
            filterable
            clearable
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogEdit = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cityOptions from '@/utiles/city_data2017_element'
import { getOrders } from '@/api/orders'
export default {
  created () {
    this.getOrders()
  },
  data () {
    return {
      dialogEdit: false,
      selectValue: [],
      input: '',
      total: 0,
      pagenum: 1,
      pagesize: 10,
      query: '',
      ordersList: [],
      addressForm: {},
      cityOptions: cityOptions,
      addressValue: ''

    }
  },
  methods: {
    async getOrders () {
      try {
        const res = await getOrders({
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        console.log(res)
        if (res.goods === 0 && this.pagenum !== 1) {
          this.pagenum -= 1
          this.getOrders()
        }
        this.total = res.total
        this.ordersList = res.goods
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getOrders()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getOrders()
    },
    handleEdit (index, row) {
      this.editForm = { ...row }
      this.dialogEdit = true
    },
    // 编辑订单信息
    async editUser () {
      // try {
      //   await editUser(this.editForm)
      //   this.getOrders()
      //   this.dialogEdit = false
      //   this.$message.success('用户资料编辑成功')
      //   this.editForm = {}
      // } catch (error) {
      //   console.log(error)
      // }
    },
    search () {
      this.query = this.input
      this.pagenum = 1
      this.getOrders()
    },
    handleColse () {
      this.addressValue = ''
      const obj = {}
      obj.stopPropagation = () => { }
      this.$refs.addressCascader.handleClear(obj)
      this.addressForm = {
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.box-card {
  padding: 20px;
  margin: 15px 0 15px 0;
  width: 1164px;
  .el-col {
    height: 40px;
  }
  :deep(.el-card__body) {
    padding: 0;
  }
}
.el-table {
  font-size: 12px;
  margin: 15px 0 15px 0;
}
</style>
