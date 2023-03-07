<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="用户账号" prop="userId">-->
<!--        <el-input-->
<!--          v-model="queryParams.userId"-->
<!--          placeholder="请输入用户账号"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="用户名" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="打卡日期" prop="attendDate">
        <el-date-picker clearable
          v-model="queryParams.attendDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择打卡日期">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="上午打卡" prop="attendUpTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.attendUpTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="请选择上午打卡">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="下午打卡" prop="attendDownTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.attendDownTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="请选择下午打卡">-->
<!--        </el-date-picker>-->
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
          v-hasPermi="['office:attend:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['office:attend:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['office:attend:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['office:attend:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="attendList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="序号" align="center" prop="attendId" />-->
<!--      <el-table-column label="用户账号" align="center" prop="userId" />-->
      <el-table-column label="用户名" align="center" prop="nickName" />
      <el-table-column label="打卡日期" align="center" prop="attendDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.attendDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上午打卡" align="center" prop="attendUpTime" width="180">
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.attendUpTime, '{h}:{i}:{s}') }}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="下午打卡" align="center" prop="attendDownTime" width="180">
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.attendDownTime, '{h}:{i}:{s}') }}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['office:attend:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['office:attend:remove']"
          >删除</el-button>
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

    <!-- 添加或修改员工考勤对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户账号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item label="用户名" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="打卡日期" prop="attendDate">
          <el-date-picker clearable
            v-model="form.attendDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择打卡日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上午打卡" prop="attendUpTime">
          <el-time-picker
            v-model="form.attendUpTime"
            value-format="HH:mm:ss"
            placeholder="请选择上午打卡">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="下午打卡" prop="attendDownTime">
          <el-time-picker
            v-model="form.attendDownTime"
            value-format="HH:mm:ss"
            placeholder="请选择下午打卡">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listAttend, getAttend, delAttend, addAttend, updateAttend } from "@/api/office/attend";

export default {
  name: "Attend",
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
      // 员工考勤表格数据
      attendList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        nickName: null,
        attendDate: null,
        attendUpTime: null,
        attendDownTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户账号不能为空", trigger: "blur" }
        ],
        attendDate: [
          { required: true, message: "打卡日期不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询员工考勤列表 */
    getList() {
      this.loading = true;
      listAttend(this.queryParams).then(response => {
        this.attendList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        attendId: null,
        userId: null,
        nickName: null,
        attendDate: null,
        attendUpTime: null,
        attendDownTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.attendId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加员工考勤";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const attendId = row.attendId || this.ids
      getAttend(attendId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改员工考勤";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.attendId != null) {
            updateAttend(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAttend(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const attendIds = row.attendId || this.ids;
      this.$modal.confirm('是否确认删除员工考勤编号为"' + attendIds + '"的数据项？').then(function() {
        return delAttend(attendIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('office/attend/export', {
        ...this.queryParams
      }, `attend_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
