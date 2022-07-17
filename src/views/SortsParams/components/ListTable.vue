<template>
  <div>
    <el-table :data="list" border style="width: 100%" stripe>
      <el-table-column type="expand" width="50">
        <template slot-scope="props">
          <template v-if="props.row.attr_vals">
            <el-tag
              closable
              v-for="tags in props.row.attr_vals.trim().split(/\s+/)"
              :key="tags"
              :disable-transitions="false"
              @close="handleClose(tags, props)"
            >
              {{ tags === " " ? null : tags }}
            </el-tag>
          </template>
          <el-input
            class="input-new-tag"
            v-if="props.$index === index && inputVisible"
            v-model.trim="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="$event.target.blur()"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(props)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="attr_name" label="分类名称" width="531">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i
          ></el-button> </template
      ></el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog
      :title="sel === 'many' ? '修改动态参数' : '修改静态属性'"
      :visible.sync="editDialog"
      @close="handleColse"
    >
      <el-form :model="changeParamsForm" :rules="rule" ref="changeParamsForm">
        <el-form-item
          :label="sel === 'many' ? '修改动态参数' : '修改静态属性'"
          :label-width="formLabelWidth"
          prop="attr_name"
        >
          <el-input
            v-model="changeParamsForm.attr_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editParams, deleteParams } from '@/api/goods'
export default {
  props: {
    list: {
      type: Array
    },
    sel: {
      type: String,
      required: true
    },
    rule: {
      type: Object,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      editDialog: false,
      formLabelWidth: '120px',
      changeParamsForm: { attr_name: '' },
      changeValForm: {},
      index: 0,
      tags: []
    }
  },
  methods: {
    // 修改vals
    async handleClose (tag, props) {
      this.changeValForm.id = props.row.cat_id
      this.changeValForm.attrId = props.row.attr_id
      this.changeValForm.attr_name = props.row.attr_name
      this.changeValForm.attr_sel = this.sel
      this.index = props.$index
      const tagsList = this.list[this.index].attr_vals.trim().split(/\s+/)
      tagsList.splice(tagsList.indexOf(tag), 1)
      this.changeValForm.attr_vals = tagsList.join(' ')
      await editParams(this.changeValForm)
      this.list[this.index].attr_vals = tagsList.join(' ')
      this.$message.success('删除成功')
    },
    showInput (props) {
      this.inputVisible = true
      this.index = props.$index
      this.changeValForm.id = props.row.cat_id
      this.changeValForm.attrId = props.row.attr_id
      this.changeValForm.attr_name = props.row.attr_name
      this.changeValForm.attr_sel = this.sel
      this.changeValForm.attr_vals = props.row.attr_vals
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm () {
      if (this.inputValue === '') {
        this.inputVisible = false
        return
      }
      if (this.changeValForm.attr_vals.indexOf(this.inputValue) === -1) {
        this.changeValForm.attr_vals = this.changeValForm.attr_vals + ' ' + this.inputValue
        this.inputVisible = false
        this.inputValue = ''
        await editParams(this.changeValForm)
        this.$message.success('添加成功')
        this.list[this.index].attr_vals = this.changeValForm.attr_vals
      } else {
        this.$message.error('已存在相同属性')
      }
    },
    // 修改cat
    handleEdit (index, row) {
      this.changeParamsForm.id = row.cat_id
      this.changeParamsForm.attrId = row.attr_id
      this.changeParamsForm.attr_sel = row.attr_sel
      this.changeParamsForm.attr_name = row.attr_name
      this.editDialog = true
    },
    editConfirm () {
      this.$refs.changeParamsForm.validate(async (valid) => {
        if (valid) {
          await editParams(this.changeParamsForm)
          await this.$emit('getParmasList')
          this.$message.success('修改成功')
          this.editDialog = false
        } else {
          this.$message.error('请按格式输入')
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteParams(row.cat_id, row.attr_id)
          await this.$emit('getParmasList')
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
      this.$refs.changeParamsForm.resetFields()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.el-table {
  font-size: 12px;
  margin: 15px 0 15px 0;
}
.el-tag {
  margin-left: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
