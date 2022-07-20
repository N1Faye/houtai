<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="dialogAddSorts = true"
            >添加分类</el-button
          ></el-col
        >
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <zk-table
        ref="table"
        :data="sortsList"
        :columns="columns"
        index-text="#"
        border
        show-index
        tree-type
        :selection-type="false"
        :expand-type="false"
      >
        <template slot="cat_deleted" scope="scope">
          <i
            :class="
              scope.row.cat_deleted ? 'el-icon-success' : 'el-icon-success'
            "
            :style="scope.row.cat_deleted ? 'color:red' : 'color: green'"
          ></i>
        </template>
        <template slot="cat_level" scope="scope">
          <el-tag
            :type="
              Number(scope.row.cat_level) === 0
                ? ''
                : Number(scope.row.cat_level) == 1
                ? 'success'
                : 'warning'
            "
            >{{
              Number(scope.row.cat_level) === 0
                ? "一级"
                : Number(scope.row.cat_level) == 1
                ? "二级"
                : "三级"
            }}
          </el-tag></template
        >
        <template slot="操作">
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
          ></template
        >
      </zk-table>
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
    <!-- 添加用户 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogAddSorts">
      <el-form :model="addSortsForm" :rules="addSortsRules">
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="cat_name"
        >
          <el-input
            v-model="addSortsForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="父级分类"
          :label-width="formLabelWidth"
          prop="cat_id"
        >
          <el-cascader
            v-model="value"
            :options="goodsSortsList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户信息 -->
    <el-dialog title="编辑用户" :visible.sync="dialogEdit">
      <el-form :model="editForm" :rules="editRules">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="editForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSortsList } from '@/api/goods'
export default {
  created () {
    this.getSortsList()
  },
  data () {
    const validateName = (rule, value, callback) => {
      this.paramsList.some(item => item.attr_name === value) ? callback(new Error('参数名/属性名已存在')) : callback()
    }
    return {
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          width: '267px'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template',
          template: 'cat_deleted',
          width: '267px'

        },
        {
          label: '排序',
          type: 'template',
          prop: 'cat_level',
          template: 'cat_level',
          width: '267px'

        },
        {
          label: '操作',
          type: 'template',
          template: '操作',
          width: '267px'

        }
      ],
      formLabelWidth: '120px',
      dialogAddSorts: false,
      dialogEdit: false,
      dialogSet: false,
      selectValue: [],
      input: '',
      total: 0,
      pagenum: 1,
      pagesize: 5,
      sortsList: [],
      addSortsForm: {
        cat_name: '',
        cat_id: ''
      },
      addSortsRules: {
        cat_name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ]
      },
      goodsSortsList: [],
      editForm: {},
      editRules: {
      }
    }
  },
  methods: {
    async getSortsList () {
      try {
        const res = await getSortsList({
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        if (res.result.length === 0 && this.pagenum !== 1) {
          this.pagenum -= 1
          this.getSortsList()
        }
        this.total = res.total
        console.log(res)
        this.sortsList = res.result
        console.log(this.sortsList)
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
      this.pagenum = 1
      console.log(this.pagenum)
      this.getSortsList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      console.log(val)
      this.getSortsList()
    },
    // 添加用户
    async addUser () {
      try {
        // await addUser(this.addUserForm)
        this.pagenum = 1
        this.getSortsList()
        this.dialogAddUser = false
        this.$message.success('添加用户成功')
        this.addUserForm = {}
      } catch (error) {
        console.log(error)
      }
    },
    // 更改用户状态
    handleEdit (index, row) {
      //   this.editForm.username = row.username
      //   this.editForm.id = row.id
      //   this.editForm.email = row.email
      //   this.editForm.mobile = row.mobile
      //   this.dialogEdit = true
    },
    // // 编辑用户资料
    async editUser () {
      //   try {
      //     await editUser(this.editForm)
      //     this.getUsers()
      //     this.dialogEdit = false
      //     this.$message.success('用户资料编辑成功')
      //     this.editForm = {}
      //   } catch (error) {
      //     console.log(error)
      //   }
    },
    // // 删除单个用户
    handleDelete (index, row) {
      //   console.log(index, row)
      //   this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(async () => {
      //     try {
      //       await deleteUser(row.id)
      //       this.getUsers()
      //       this.$message.success('删除成功')
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
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
.zk-table {
  font-size: 12px;
  margin: 15px 0 15px 0;
}
</style>
