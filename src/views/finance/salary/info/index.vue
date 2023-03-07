<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户账号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="工作天数" prop="workDays">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.workDays"-->
      <!--          placeholder="请输入工作天数"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="加班时间" prop="otHour">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.otHour"-->
      <!--          placeholder="请输入加班时间"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="缺勤天数" prop="absentDays">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.absentDays"-->
      <!--          placeholder="请输入缺勤天数"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="病假天数" prop="sickDays">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.sickDays"-->
      <!--          placeholder="请输入病假天数"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="公积金" prop="providentFund">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.providentFund"-->
      <!--          placeholder="请输入公积金"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="实际工资" prop="sum">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.sum"-->
      <!--          placeholder="请输入实际工资"-->
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
          @click="handleAdd"
          v-hasPermi="['salary:info:add']"
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
          v-hasPermi="['salary:info:edit']"
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
          v-hasPermi="['salary:info:remove']"
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
          v-hasPermi="['salary:info:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="主键" align="center" prop="id"/>-->
      <el-table-column label="用户账号" align="center" prop="userId"/>
      <el-table-column label="工作天数" align="center" prop="workDays"/>
      <el-table-column label="加班时间" align="center" prop="otHour"/>
      <el-table-column label="缺勤天数" align="center" prop="absentDays"/>
      <el-table-column label="病假天数" align="center" prop="sickDays"/>
      <el-table-column label="公积金" align="center" prop="providentFund"/>
      <el-table-column label="实际工资" align="center" prop="sum"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['salary:info:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleshowInfo(scope.row)"
            v-hasPermi="['salary:info:edit']"
          >详情
          </el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['salary:info:remove']"
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

    <!-- 添加或修改工资详情对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户账号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户账号"/>
        </el-form-item>
        <el-form-item label="工作天数" prop="workDays">
          <el-input v-model="form.workDays" placeholder="请输入工作天数"/>
        </el-form-item>
        <el-form-item label="加班时间" prop="otHour">
          <el-input v-model="form.otHour" placeholder="请输入加班时间"/>
        </el-form-item>
        <el-form-item label="缺勤天数" prop="absentDays">
          <el-input v-model="form.absentDays" placeholder="请输入缺勤天数"/>
        </el-form-item>
        <el-form-item label="病假天数" prop="sickDays">
          <el-input v-model="form.sickDays" placeholder="请输入病假天数"/>
        </el-form-item>
        <el-form-item label="公积金" prop="providentFund">
          <el-input v-model="form.providentFund" placeholder="请输入公积金"/>
        </el-form-item>
        <el-form-item label="实际工资" prop="sum">
          <el-input v-model="form.sum" placeholder="请输入实际工资"/>
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


    <el-drawer
      title="邮件详情"
      :visible.sync="Infotable"
      direction="rtl"
      size="45%"
      class="el-drawer__title"
    >
      <el-table :data="gridData">
        <el-table-column property="id" label="序号" width="50"></el-table-column>
        <el-table-column property="date" label="日期" width="100"></el-table-column>
        <el-table-column property="name" label="姓名" width="150"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div class="el-main">
        <el-descriptions title="用户信息">
          <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
          <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        </el-descriptions>
      </div>
      <el-divider></el-divider>
      <div class="text-sign">
        <el-button
          size="medium"
          round
          plain
          @click="Infotable = false"
        >关闭
        </el-button>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/finance/salary/info'

export default {
  name: 'Info',
  data() {
    return {
      gridData: [{
        id: '',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      // 遮罩层
      loading: true,
      //显示
      Infotable: false,
      // 选中数组
      ids: [],
      userIds: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 工资详情表格数据
      infoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        workDays: null,
        otHour: null,
        absentDays: null,
        sickDays: null,
        providentFund: null,
        sum: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询工资详情列表 */
    getList() {
      this.loading = true
      listInfo(this.queryParams).then(response => {
        this.infoList = response.rows
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
        id: null,
        userId: null,
        workDays: null,
        otHour: null,
        absentDays: null,
        sickDays: null,
        providentFund: null,
        sum: null,
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
      this.ids = selection.map(item => item.id)
      this.userIds = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加工资详情'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getInfo(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改工资详情'
      })
    },

    /** 查看详情按钮操作 */
    handleshowInfo(row) {
      this.reset()
      const id = row.id || this.ids
      getInfo(id).then(response => {
        this.form = response.data
        this.Infotable = true
        this.title = '修改工资详情'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInfo(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addInfo(this.form).then(response => {
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
      const ids = row.id || this.ids
      const userIds = row.userId || this.userIds
      this.$modal.confirm('是否确认删除工资详情编号为"' + userIds + '"的数据项？').then(function() {
        return delInfo(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('salary/info/export', {
        ...this.queryParams
      }, `info_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>

<style scoped lang="scss">
.text-sign {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
