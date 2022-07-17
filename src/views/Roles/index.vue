<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="dialogAddUser = true"
        >添加角色</el-button
      >
      <el-table :data="rolesList" border style="width: 100%" stripe>
        <el-table-column type="expand" label="#" width="50">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="324">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="324">
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
            <el-button
              type="warning"
              size="mini"
              @click="handleSet(scope.$index, scope.row)"
              ><i class="el-icon-setting"></i>分配权限</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogRoles" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRoles = false">取 消</el-button>
        <el-button type="primary" @click="dialogRoles = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.getRolesList()
  },
  data () {
    return {
      dialogRoles: false
    }
  },
  methods: {
    async getRolesList () {
      await this.$store.dispatch('roles/getRoles')
    },
    async handleSet (index, row) {
      this.dialogRoles = true
    }
  },
  computed: {
    ...mapGetters(['rolesList'])
  },
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
