<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="openAddDialog"
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
        <template slot="操作" scope="scope">
          <el-button type="primary" size="mini"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
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
          :current-page.sync="pagenum"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加分类 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="dialogAddCats"
      @close="handleColse"
    >
      <el-form :model="addCatsForm" :rules="addCatsRules" ref="addCatsForm">
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="cat_name"
        >
          <el-input
            ref="addCatInput"
            v-model="addCatsForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="父级分类"
          :label-width="formLabelWidth"
          prop="cat_id"
        >
          <el-cascader
            v-model="catValue"
            :options="sortsList2"
            :props="{
              checkStrictly: 'true',
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
            }"
            filterable
            clearable
            ref="catCascader"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCats = false">取 消</el-button>
        <el-button type="primary" @click="addCats">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSortsList, addCats, deleteCat } from '@/api/goods'
export default {
  created () {
    this.getSortsList()
    this.getSortsListAll()
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (this.addCatsForm.cat_level === 2) {
        this.sortsListAll.filter(item => item.cat_id === this.grandpaPid)[0].children.filter(item => item.cat_id === this.addCatsForm.cat_pid)[0].children.some(item => item.cat_name === value) ? callback(new Error('分类名已存在')) : callback()
      } else if (this.addCatsForm.cat_level === 1) {
        this.sortsListAll.filter(item => item.cat_id === this.addCatsForm.cat_pid)[0].children.some(item => item.cat_name === value) ? callback(new Error('分类名已存在')) : callback()
      } else {
        this.sortsListAll.some(item => item.cat_name === value) ? callback(new Error('分类名已存在')) : callback()
      }
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
      dialogAddCats: false,
      dialogEdit: false,
      dialogSet: false,
      selectValue: [],
      input: '',
      total: 0,
      pagenum: 1,
      pagesize: 5,
      catValue: '',
      sortsList: [],
      sortsListAll: [],
      sortsList2: [],
      addCatsForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0,
        cat_id: ''
      },
      grandpaPid: '',
      addCatsRules: {
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
    async getSortsListAll () {
      this.sortsListAll = await getSortsList({ type: 3 })
    },
    async getSortsList () {
      console.log(this.pagenum)
      const res = await getSortsList({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      if (res.result.length === 0 && this.pagenum !== 1) {
        this.pagenum -= 1
        this.getSortsList()
      }
      console.log(res)
      this.total = res.total
      this.sortsList = res.result
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getSortsList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getSortsList()
    },
    async openAddDialog () {
      this.dialogAddCats = true
      this.sortsList2 = await getSortsList({ type: 2 })
    },
    handleChange (value) {
      if (value.length === 2) {
        this.addCatsForm.cat_level = 2
        this.grandpaPid = value[0]
        this.addCatsForm.cat_pid = value[1]
      } else if (value.length === 1) {
        this.addCatsForm.cat_level = 1
        this.addCatsForm.cat_pid = value[0]
      } else {
        this.addCatsForm.cat_level = 0
        this.addCatsForm.cat_pid = 0
      }
      this.$refs.addCatInput.focus()
    },
    // 添加分类
    async addCats () {
      this.$refs.addCatsForm.validate(async (valid) => {
        if (valid) {
          await addCats(this.addCatsForm)
          if (this.addCatsForm.cat_level === 0) {
            this.pagenum = (this.total + 1) % this.pagesize === 0 ? (this.total + 1) / this.pagesize : Math.ceil((this.total + 1) / this.pagesize)
            this.pagenum = this.pagenum + 1
          }
          console.log('add', this.pagenum)
          await this.getSortsList()
          await this.getSortsListAll()
          this.dialogAddCats = false
          this.$message.success('添加分类成功')
        } else {
          this.$message.error('请按格式输入')
        }
      })
    },
    // 删除分类
    handleDelete (row) {
      console.log('1', this.pagenum)
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteCat(row.cat_id)
          await this.getSortsListAll()
          await this.getSortsList()
          console.log('2', this.pagenum)
          // if (row.cat_level === 0) {
          // await this.getSortsList()
          // } else if (row.cat_level === 1) {
          //   this.sortsList.forEach(item => {
          //     let arr = []
          //     if (item.children) {
          //       arr = item.children.filter(item1 =>
          //         item1.cat_pid === row.cat_pid
          //       )
          //       console.log('arr', arr)
          //     }
          //   })
          //   console.log(this.sortsList.filter(item => item.cat_id === 1988))
          //   this.sortsList.filter(item => item.cat_id === 1988)[0].children.splice(5, 1)
          //   console.log(1)
          // } else {
          //   console.log(2)
          // }
          this.$message.success('删除成功')
        } catch (error) {
          console.log(error)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleColse () {
      this.$refs.addCatsForm.resetFields()
      this.catValue = ''
      const obj = {}
      obj.stopPropagation = () => { }
      this.$refs.catCascader.handleClear(obj)
      this.addCatsForm = {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
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
.zk-table {
  font-size: 12px;
  margin: 15px 0 15px 0;
}
</style>
