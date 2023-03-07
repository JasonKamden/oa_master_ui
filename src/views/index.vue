<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="24">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <img :src="item.idView" class="image">
          </el-carousel-item>
        </el-carousel>
        <hr/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="8" style="padding-left: 20px">
        <div class="clock">
          <h2>时钟</h2>
          <h3 class="time">{{ time }}</h3>
          <p class="date">{{ date }} {{ weekday }}</p>
        </div>
        <hr>
        <div class="text-sign">
          <p>
            <el-button
              type="primary"
              size="medium"
              icon="el-icon-cloudy"
              round
              plain
              @click="changeSignStatus"
            >{{ signTitle }}
            </el-button>
          </p>
        </div>
        <hr>
        <div id="app">
          <barcode v-bind:value="barcodeValue"
                   height="50">
            Show this if the rendering fails.
          </barcode>
        </div>
      </el-col>

      <el-col :sm="24" :lg="16" style="padding-left: 50px">
        <el-row>
          <el-calendar v-model="calendarValue" id="calendar">
            <template slot="dateCell" slot-scope="{date, data}">
              <div @click="chooseDay(data)" class="click">
                <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                <!--                展现内容-->
                <div class="blue budge" v-if="dealMyDate(data.day)"></div>
              </div>
            </template>
          </el-calendar>
        </el-row>
      </el-col>
    </el-row>
    <el-divider/>


    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span class="card-header">个人便签</span>
          </div>
          <div class="body">
            <p>
              <i class="el-icon-s-promotion"></i> 官网：
              <el-link
                href="https://kiti.club"
                target="_blank"
              >https://kiti.club
              </el-link
              >
            </p>
            <p>
              <i class="el-icon-user-solid"></i> QQ群：
              <s>满104748341</s> <s>满160110482</s>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span class="card-header">通知公告</span>
          </div>
          <el-collapse accordion>
            <div v-for="notice in noticeList" :key="notice.noticeId">
              <el-collapse-item :title="notice.noticeTitle">
                <ol>
                  <li>
                    <span v-html="notice.noticeContent"></span>
                  </li>
                </ol>
              </el-collapse-item>
            </div>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <div slot="header" class="clearfix">
            <span class="card-header">内部邮件</span>
          </div>
          <div class="body">
            <div v-for="notice in noticeList" :key="notice.noticeId" class="text item">
              <div class="cell el-tooltip row-cell" @click="handleQuery(notice.noticeId)">
                {{notice.noticeTitle |ellipsis}}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-drawer
      title="邮件详情"
      :visible.sync="table"
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
          @click="table= false"
        >关闭
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { addAttend, getAttend, getDateList } from '@/api/office/attend'
import { listNotice} from "@/api/system/notice";
import VueBarcode from 'vue-barcode';
export default {
  name: 'Index',
  data() {
    return {
      date: '',
      barcodeValue: 'test',
      time: '',
      weekday: '',
      imgList: [
        { id: 0, idView: require('@/assets/770_images/12.png') },
        { id: 1, idView: require('@/assets/770_images/20.jpg') },
        { id: 2, idView: require('@/assets/770_images/21.png') },
        { id: 3, idView: require('@/assets/770_images/23.jpg') },
        { id: 4, idView: require('@/assets/770_images/27.png') }
      ],
      week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      calendarValue: new Date(),
      table: false,
      signTitle: '',
      isSign: false,
      // 公告表格数据
      noticeList: [],
      attend: {
        attendDate: null,
        attendUpTime: null,
        attendDownTime: null
      },
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
      }]
    }
  },
  components: {
    'barcode': VueBarcode
  },

  //限制文字长度
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 30) {
        return value.slice(0, 30) + '...'
      }
      return value
    }
  },
  created() {
    this.getIsAttend()
    this.getList()
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(1)'
      )
      prevBtn.addEventListener('click', e => {
        let d = new Date(this.calendarValue)
        let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1))//2023-08
        console.log('前一个月:' + resDate)
      })
      //点击下一个月
      let nextBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(3)'
      )
      nextBtn.addEventListener('click', e => {
        let d = new Date(this.calendarValue)
        let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1))//2023-10
        console.log('下一个月:' + resDate)
      })
      //点击今天
      let todayBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(2)'
      )
      todayBtn.addEventListener('click', e => {
        let d = new Date(this.calendarValue)
        let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1))//2023-09
        console.log('今天:' + resDate)
      })
    })
  },
  mounted() {

    //设置时间
    this.$nextTick(function() {
      setInterval(this.updateTime, 1000)
    })
  },

  methods: {
    /** 查询公告列表 */
    getList() {
      listNotice(this.queryParams).then(response => {
        this.noticeList = response.rows;
      });
      console.log(this.noticeList)
    },
    //处理时间
    handleTime(s) {
      return s < 10 ? '0' + s : s
    },
    updateTime() {
      let cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':'
        + this.zeroPadding(cd.getSeconds(), 2)
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-'
        + this.zeroPadding(cd.getDate(), 2)
      this.weekday = this.week[cd.getDay()]
    },
    zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    chooseDay(data) {
      if (data.day != this.date) {
        this.$notify.error({
          title: '错误',
          message: '当前天' + data.day + '不允许打卡！'
        })
      } else {
        var userName = this.$store.state.user.name
        console.log('day:' + data.day + 'userName:' + userName)
        this.$notify({
          title: '成功',
          message: '打卡成功',
          type: 'success'
        })
      }
    },
    dealMyDate(v) {
      let res = ''
      this.potDate = [
        { date: '2023-01-02' },
        { date: '2023-01-22' }
      ]
      for (let i = 0; i < this.potDate.length; i++) {
        if (this.potDate[i].date === v) {
          // res = this.potDate[i].hasRecord;
          res = true
          break
        }
      }
      return res
    },
    handleQuery(o) {
      this.table = true
      for (let i = 0; i < this.gridData.length; i++) {
        this.gridData[i].id = o
      }
    },
    changeSignStatus() {
      this.attend.attendDate = this.date
      this.attend.attendUpTime = this.time
      this.attend.attendDownTime = this.time

      addAttend(this.attend).then(response => {
        this.signTitle = '已经签到'
        this.$modal.msgSuccess('签到成功')
      })
    },
    getIsAttend() {
      // this.loading = true
      // getAttend(this.queryParams).then(response => {
      //   this.attendList = response.rows
      //   this.total = response.total
      //   this.loading = false
      // })
      const username = this.$store.state.user.name
      getDateList(username).then(response => {
        console.log('response' + response.data)
      })
    }
  }
}

</script>

<style scoped lang="scss">
.row-cell {
  padding-top: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8eaec;
}

.text-sign {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header {
  font-size: 17px;
  font-weight: 700;
}

.budge {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin: 25px auto;
  border: 1px solid red;
}

.click {
  width: 100%;
  height: 100%;
}

.blue {
  background-color: #409eff;
}

.clock {
  border-radius: 10px;
  padding: 10px 40px;
  background: linear-gradient(90deg, #8e54e9, #4776e6);
  color: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4)
}

.clock h3 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }

}
</style>

