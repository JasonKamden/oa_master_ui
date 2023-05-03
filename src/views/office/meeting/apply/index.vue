<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker clearable
                        v-model="queryParams.beginTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable
                        v-model="queryParams.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="会议类型" prop="meetingType">
        <el-select v-model="queryParams.meetingType" placeholder="请选择会议类型" clearable>
          <el-option
            v-for="dict in dict.type.sys_meeting_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['meeting:apply:add']"
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
          v-hasPermi="['meeting:apply:edit']"
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
          v-hasPermi="['meeting:apply:remove']"
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
          v-hasPermi="['meeting:apply:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="applyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="会议ID" align="center" prop="roomId"/>-->
      <el-table-column label="会议名称" align="center" prop="sysMeetingInfo.roomName"/>
      <el-table-column label="实际容量" align="center" prop="sysMeetingInfo.capacity"/>
      <el-table-column label="已用容量" align="center">
        <template slot-scope="scope">
          <router-link :to="'/office/meeting-user/index/' + scope.row.meetingId" class="link-type">
            <span>{{ scope.row.useCapacity }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="会议主题" align="center" prop="subject">
        <template slot-scope="scope">
          <router-link :to="'/office/meeting-notes/index/' + scope.row.meetingId" class="link-type">
            <span>{{ scope.row.subject}}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="会议类型" align="center" prop="meetingType">-->
      <!--        <template slot-scope="scope">-->
      <!--          <dict-tag :options="dict.type.sys_meeting_type" :value="scope.row.meetingType"/>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="会议主持" align="center" prop="chairUserName" />-->
      <!--      <el-table-column label="手机号码" align="center" prop="chairUserPhone" />-->
      <el-table-column label="预约状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_appointment_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <!--      <el-table-column label="邮件通知" align="center" prop="mailStatus">-->
      <!--        <template slot-scope="scope">-->
      <!--          <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.mailStatus"/>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="会议附件" align="center" prop="fileAttach" />-->
      <!--      <el-table-column label="备注" align="center" prop="remark"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['meeting:apply:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['meeting:apply:remove']"
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

    <!-- 添加或修改会议申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-descriptions title="用户信息" size="medium" :model="form" :rules="rules" label-width="80px" :column="1">
        <el-descriptions-item label="用户名">
          <span class="el-dropdown-link el-tooltip__trigger el-tooltip__trigger"
                @click="testClick"
          >{{ form.roomId }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">数据显示</el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会议ID" prop="roomId"  v-if="false">
          <el-input v-model="form.roomId" />
        </el-form-item>
<!--        <el-table-column label="会议名称" align="center" prop="sysMeetingInfo.roomName"/>-->
        <!--        <el-form-item label="已用容量" prop="useCapacity">-->
        <!--          <el-input v-model="form.useCapacity" placeholder="请输入已用容量" />-->
        <!--        </el-form-item>-->
        <el-form-item label="会议主题" prop="subject">
          <el-input v-model="form.subject" disabled />
        </el-form-item>
        <el-form-item label="会议类型" prop="meetingType">
          <el-select v-model="form.meetingType" disabled >
            <el-option
              v-for="dict in dict.type.sys_meeting_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议主持" prop="chairUserName">
          <el-input v-model="form.chairUserName" disabled/>
        </el-form-item>
        <el-form-item label="手机号码" prop="chairUserPhone">
          <el-input v-model="form.chairUserPhone" disabled/>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="form.mail" disabled/>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime"  disabled>
          <el-date-picker clearable
                          v-model="form.beginTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" disabled>
          <el-date-picker clearable
                          v-model="form.endTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="预约状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_appointment_status"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮件通知" prop="mailStatus"  disabled>
          <el-radio-group v-model="form.mailStatus">
            <el-radio
              v-for="dict in dict.type.sys_yes_no"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会议附件" prop="fileAttach" disabled>
          <file-upload v-model="form.fileAttach"/>
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
import { listApply, getApply, delApply, addApply, updateApply } from '@/api/office/meeting/apply'

export default {
  name: 'Apply',
  dicts: ['sys_meeting_type', 'sys_yes_no', 'sys_appointment_status'],
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
      // 会议申请表格数据
      applyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roomId: null,
        useCapacity: null,
        subject: null,
        beginTime: null,
        endTime: null,
        meetingType: null,
        chairUserName: null,
        chairUserPhone: null,
        status: null,
        mailStatus: null,
        fileAttach: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        roomId: [
          { required: true, message: '会议ID不能为空', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '会议开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '会议结束时间不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询会议申请列表 */
    getList() {
      this.loading = true
      listApply(this.queryParams).then(response => {
        this.applyList = response.rows
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
        meetingId: null,
        roomId: null,
        useCapacity: null,
        subject: null,
        beginTime: null,
        endTime: null,
        meetingType: null,
        chairUserName: null,
        chairUserPhone: null,
        mail:null,
        status: null,
        mailStatus: null,
        fileAttach: null,
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
      this.ids = selection.map(item => item.meetingId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加会议申请'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const meetingId = row.meetingId || this.ids
      getApply(meetingId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改会议申请'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.meetingId != null) {
            updateApply(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addApply(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    testClick() {
      console.log(123)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const meetingIds = row.meetingId || this.ids
      this.$modal.confirm('是否确认删除会议申请编号为"' + row.sysMeetingInfo.roomName + '"的数据项？').then(function() {
        return delApply(meetingIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('meeting/apply/export', {
        ...this.queryParams
      }, `apply_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #2a64a6;
}
</style>
