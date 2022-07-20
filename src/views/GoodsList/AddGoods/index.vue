<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-steps :active="tabid - 1" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs
        v-model="tabid"
        tab-position="left"
        @tab-click="onClick"
        :before-leave="beforeTab"
      >
        <el-tab-pane label="基本信息" name="1">
          <el-form
            label-position="top"
            label-width="80px"
            :model="addGoodsForm"
            :rules="addGoodsFormRules"
            ref="addGoodsForm"
          >
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                :options="goodsSortsList"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                }"
                clearable
                filterable
                v-model="addGoodsForm.goods_cat"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form label-position="top">
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) in paramsList"
              :key="index"
            >
              <el-checkbox-group v-model="item.attr_checked_vals">
                <el-checkbox
                  v-for="(item1, index) in item.attr_vals"
                  :label="item1"
                  :key="index"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form>
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) in valsList"
              :key="index"
            >
              <el-input v-model="item.attr_vals"></el-input> </el-form-item
          ></el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-upload
            class="upload-demo"
            action="http://liufusong.top:8899/api/private/v1/upload"
            :on-success="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs></el-card
    >
    <!-- 图片预览 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialogVisible"
      width="40%"
      class="dialog-picture"
    >
      <img :src="addGoodsForm.pics" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import { validNum, validQuantity } from '@/utiles/validate'
import { getSortsList, addGoods, getParmasList } from '@/api/goods'
export default {
  created () {
    this.getSortsList()
  },
  data () {
    const validateQuantity = (rule, value, callback) => {
      validQuantity(value) ? callback() : callback(new Error('请输入非负整数'))
    }
    const validateNum = (rule, value, callback) => {
      validNum(value) ? callback() : callback(new Error('请输入非负数字,且小数点后不能超过两位'))
    }
    return {
      tabid: '1',
      id: null,
      labelPosition: '120px',
      addGoodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      addGoodsFormRules: {
        goods_name: [
          { required: true, message: '商品名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在3到8之间', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }

        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' }

        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' },
          { validator: validateQuantity, trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '商品名不能为空', trigger: 'blur' }]
      },
      goodsSortsList: [],
      catValue: [],
      selectValue: '',
      paramsList: [],
      valsList: [],
      fileList: [],
      checkList: [],
      previewDialogVisible: false,
      disabled: false
    }
  },
  methods: {
    async getSortsList () {
      this.goodsSortsList = await getSortsList({ type: 3 })
    },
    handleChange (value) {
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
        return false
      } else {
        console.log(value[value.length - 1])
        this.addGoodsForm.goods_cat = value.join(',')
        this.id = value[value.length - 1]
      }
    },
    async onClick (tab) {
      if (!this.id) {
        return false
      } else {
        if (tab.index === '1') {
          try {
            const res = await getParmasList({ id: this.id, sel: 'many' })
            res.forEach(item => {
              item.attr_vals = item.attr_vals.length !== 0 ? item.attr_vals.trim().split(/\s+/) : ['']
              item.attr_checked_vals = [...item.attr_vals]
            })
            this.paramsList = res
          } catch (err) {
            console.log(err)
          }
        } else if (tab.index === '2') {
          console.log(111)
          try {
            const res = await getParmasList({ id: this.id, sel: 'only' })
            console.log(res)
            this.valsList = res
          } catch (err) {
            console.log(err)
          }
        }
      }
    },
    beforeTab (activeName, oldActiveName) {
      if (oldActiveName === '1') {
        if (!this.id) {
          this.$message.error('请选择商品分类')
          return false
        }
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.addGoodsForm.pics.forEach((item, index) => {
        if (item === file.url) {
          this.addGoodsForm.pics.splice(index, 1)
        }
      })
    },
    handlePreview (file, fileList) {
      this.addGoodsForm.pics.push(fileList.url)
      this.previewDialogVisible = true
    },
    async addGoods () {
      console.log(this.addGoodsForm)
      this.paramsList.forEach(item => {
        this.addGoodsForm.attrs.push({ attr_id: item.attr_id, attr_value: item.attr_vals })
      })
      this.valsList.forEach(item => {
        this.addGoodsForm.attrs.push({ attr_id: item.attr_id, attr_value: item.attr_vals })
      })

      this.$refs.addGoodsForm.validate(async (valid) => {
        if (valid) {
          const res = await addGoods(this.addGoodsForm)
          console.log(res)
          this.$router.push('/home/goods')
          this.$store.commit('nav/setNav', ['商品管理', '商品列表'])
          this.$message.success('创建成功')
        } else {
          this.$message.error('有必填项未填写')
        }
      })
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
.el-steps {
  margin: 15px 0 15px 0;
  :deep(.el-step__title) {
    font-size: 13px !important;
  }
  :deep(.is-finish) {
    color: #67c23a;
    border-color: #67c23a;
  }
}
:deep(.ql-container) {
  min-height: 300px;
  margin-bottom: 20px;
}
</style>
