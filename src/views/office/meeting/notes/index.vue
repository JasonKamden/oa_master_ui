<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!--      <el-form-item label="预约ID" prop="meetingId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.meetingId"-->
      <!--          placeholder="请输入预约ID"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="纪要标题" prop="notesTitle">
        <el-input
          v-model="queryParams.notesTitle"
          placeholder="请输入纪要标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纪要员" prop="notesUser">
        <el-input
          v-model="queryParams.notesUser"
          placeholder="请输入纪要员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['meeting:notes:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['meeting:notes:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['meeting:notes:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['meeting:notes:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-close"
          size="mini"
          @click="handleClose"
        >关闭</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="notesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="纪要ID" align="center" prop="notesId" />-->
      <!--      <el-table-column label="预约ID" align="center" prop="meetingId" />-->
      <el-table-column label="纪要标题" align="center" prop="notesTitle"/>
      <el-table-column label="纪要员" align="center" prop="notesUser"/>
      <el-table-column label="纪要内容" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.content"></span>
        </template>
      </el-table-column>
      <el-table-column label="纪要文件" align="center" prop="notesFile"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['meeting:notes:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['meeting:notes:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改会议纪要对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="750px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="预约ID" prop="meetingId">
          <el-input v-model="form.meetingId" placeholder="请输入预约ID"/>
        </el-form-item>
        <el-form-item label="纪要标题" prop="notesTitle">
          <el-input v-model="form.notesTitle" placeholder="请输入纪要标题"/>
        </el-form-item>
        <el-form-item label="纪要员" prop="notesUser">
          <el-input v-model="form.notesUser" placeholder="请输入纪要员"/>
        </el-form-item>
        <el-form-item label="纪要内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="纪要文件" prop="notesFile">
          <file-upload v-model="form.notesFile"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listNotes, getNotes, delNotes, addNotes, updateNotes } from '@/api/office/meeting/notes'

export default {
  name: 'Notes',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 会议纪要表格数据
      notesList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        meetingId: null,
        notesTitle: null,
        notesUser: null,
        content: null,
        notesFile: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        meetingId: [
          { required: true, message: '预约ID不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 返回按钮
    handleClose() {
      const obj = { path: "/office/meeting/apply" };
      this.$tab.closeOpenPage(obj);
    },
    /** 查询会议纪要列表 */
    getList() {
      this.loading = true
      this.queryParams.meetingId = this.$route.params && this.$route.params.meetingId;
      listNotes(this.queryParams).then(response => {
        this.notesList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        notesId: null,
        meetingId: null,
        notesTitle: null,
        notesUser: null,
        content: null,
        notesFile: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.notesId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加会议纪要'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const notesId = row.notesId || this.ids
      getNotes(notesId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改会议纪要'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.notesId != null) {
            updateNotes(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addNotes(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const notesIds = row.notesId || this.ids
      this.$modal.confirm('是否确认删除会议纪要编号为"' + notesIds + '"的数据项？').then(function() {
        return delNotes(notesIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('meeting/notes/export', {
        ...this.queryParams
      }, `notes_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
