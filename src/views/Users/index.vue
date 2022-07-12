<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button></el-col
        >
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-table :data="usersList" border style="width: 100%" stripe>
        <el-table-column prop="date" label="#" width="50"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="224">
        </el-table-column>
        <el-table-column prop="address" label="电话" width="224">
        </el-table-column>
        <el-table-column prop="address" label="角色" width="224">
        </el-table-column>
        <el-table-column prop="address" label="状态" width="224">
        </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  async created () {
    await this.$store.dispatch('users/getUsers', {
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
  },
  data () {
    return {
      input: '',
      pagenum: 1,
      pagesize: 5,
      usersList: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      console.log(val)
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
  height: 418.5px;
  .el-col {
    height: 40px;
  }
  :deep(.el-card__body) {
    padding: 0;
  }
}
.el-table {
  margin: 15px 0 15px 0;
}
</style>
