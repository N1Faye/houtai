<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
        <el-col :span="4">
          <el-button type="primary" @click="$router.push('/goodslist/add')"
            >添加商品</el-button
          ></el-col
        >
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-table :data="goodsList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="550">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" width="107">
        </el-table-column>
        <el-table-column prop="goods_number" label="商品数量" width="107">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="107">
          <template slot-scope="scope">
            {{ $dayjs(Number(scope.row.add_time * 1000)).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template></el-table-column
        >
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      formLabelWidth: '120px',
      input: '',
      total: 0,
      pagenum: 1,
      pagesize: 5,
      query: '',
      goodsList: []

    }
  },
  methods: {
    async getGoodsList () {
      try {
        const res = await getGoodsList({
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        console.log(res)
        if (res.goods.length === 0 && this.pagenum !== 1) {
          this.pagenum -= 1
          this.getGoodsList()
        }
        this.total = res.total
        this.goodsList = res.goods
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
      this.pagenum = 1
      console.log(this.pagenum)
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      console.log(val)
      this.getGoodsList()
    },
    handleEdit (index, row) {
      // this.editForm.username = row.username
      // this.editForm.id = row.id
      // this.editForm.email = row.email
      // this.editForm.mobile = row.mobile
      // this.dialogEdit = true
    },
    // 编辑用户资料
    async editUser () {
      // try {
      //   await editUser(this.editForm)
      //   this.goodsList()
      //   this.dialogEdit = false
      //   this.$message.success('用户资料编辑成功')
      //   this.editForm = {}
      // } catch (error) {
      //   console.log(error)
      // }
    },
    // 删除单个用户
    handleDelete (index, row) {
      // console.log(index, row)
      // this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   try {
      //     await deleteUser(row.id)
      //     this.goodsList()
      //     this.$message.success('删除成功')
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    search () {
      this.query = this.input
      this.pagenum = 1
      this.getGoodsList()
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
