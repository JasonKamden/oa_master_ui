<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会议ID" prop="meetingId">
        <el-input
          v-model="queryParams.meetingId"
          placeholder="请输入会议ID"
          clearable
          disabled
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="用户ID" prop="userId">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.userId"-->
      <!--          placeholder="请输入用户ID"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="用户昵称" prop="nickName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.nickName"-->
      <!--          placeholder="请输入用户昵称"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="用户邮箱" prop="email">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.email"-->
      <!--          placeholder="请输入用户邮箱"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="手机号码" prop="phonenumber">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.phonenumber"-->
      <!--          placeholder="请输入手机号码"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
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
          @click="openSelectUser"
          v-hasPermi="['meeting:user:add']"
        >新增
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['meeting:user:edit']"-->
      <!--        >修改-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['meeting:user:remove']"
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
          v-hasPermi="['meeting:user:export']"
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
        >关闭
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="会议ID" align="center" prop="meetingId" />-->
      <el-table-column label="用户ID" align="center" prop="userId"/>
      <el-table-column label="用户昵称" align="center" prop="sysUser.nickName"/>
      <el-table-column label="用户邮箱" align="center" prop="sysUser.email"/>
      <el-table-column label="手机号码" align="center" prop="sysUser.phonenumber"/>
      <el-table-column label="用户状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-edit"-->
          <!--            @click="handleUpdate(scope.row)"-->
          <!--            v-hasPermi="['meeting:user:edit']"-->
          <!--          >修改-->
          <!--          </el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['meeting:user:remove']"
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

    <!-- 添加或修改用户会议对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="会议ID" prop="meetingId">
          <el-input v-model="form.meetingId" placeholder="请输入会议ID" disabled/>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <!--        <el-form-item label="用户昵称" prop="nickName">-->
        <!--          <el-input v-model="form.nickName" placeholder="请输入用户昵称"/>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="用户邮箱" prop="email">-->
        <!--          <el-input v-model="form.email" placeholder="请输入用户邮箱"/>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="手机号码" prop="phonenumber">-->
        <!--          <el-input v-model="form.phonenumber" placeholder="请输入手机号码"/>-->
        <!--        </el-form-item>-->
        <el-form-item prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <select-user ref="select" :meeting-id="meetingId" @ok="handleQuery"/>
  </div>
</template>

<script>
import {listUser, getUser, delUser, addUser, changeUserStatus} from '@/api/office/meeting/user'
import selectUser from "./selectUser.vue";

export default {
  name: 'User',
  components: {selectUser},
  dicts: ['sys_normal_disable'],
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
      // 用户会议表格数据
      userList: [],
      // 弹出层标题
      title: '',
      //父向子传递参数
      meetingId: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        meetingId: null,
        userId: null,
        nickName: null,
        email: null,
        phonenumber: null,
        status: null,
        createTime: null
      },
      // 表单参数
      form: {},
    };
  },
  created() {
    this.meetingId = this.$route.params && this.$route.params.meetingId;
    this.getList()
  },
  methods: {
    /** 打开授权用户表弹窗 */
    openSelectUser() {
      this.$refs.select.show();
    },
    // 格式化日期格式如：2017-9-19 18:04:33
    formatDate(value, type) {
      // 计算日期相关值
      let time = typeof value == 'number' ? new Date(value) : value;
      let Y = time.getFullYear();
      let M = time.getMonth() + 1;
      let D = time.getDate();
      let h = time.getHours();
      let m = time.getMinutes();
      let s = time.getSeconds();
      let week = time.getDay();
      // 如果传递了type的话
      if (type == undefined) {
        return Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D) + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      } else if (type == 'week') {
        // 在quartz中 1为星期日
        return week + 1;
      }
    },
    /** 查询用户会议列表 */
    getList() {
      this.loading = true
      this.queryParams.meetingId = this.meetingId;
      listUser(this.queryParams).then(response => {
        this.userList = response.rows
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
        userId: null,
        nickName: null,
        email: null,
        phonenumber: null,
        status: null,
        createTime: null
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
      this.ids = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加用户会议'
      this.form.meetingId = this.queryParams.meetingId;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      getUser(row.meetingId, row.userId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改用户会议'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // if (this.form.meetingId != null) {
          //   updateUser(this.form).then(response => {
          //     this.$modal.msgSuccess("修改成功");
          //     this.open = false;
          //     this.getList();
          //   });
          // } else
          {
            this.form.createTime = this.formatDate(new Date());
            const sysMeetingUsers = [];
            sysMeetingUsers.push(this.form)
            addUser(sysMeetingUsers).then(response => {
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
      const userIds = row.userId || this.ids;
      const meetingId = row.meetingId
      this.$modal.confirm('是否确认删除用户会议编号为"' + row.sysUser.nickName + '"的数据项？').then(function () {
        return delUser(meetingId, userIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },

    // 返回按钮
    handleClose() {
      const obj = {path: "/office/meeting/apply"};
      this.$tab.closeOpenPage(obj);
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('meeting/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.sysUser.nickName + '"用户吗？').then(function () {
        return changeUserStatus(row.meetingId, row.userId, row.status);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
  }
}
</script>
