import request from '@/utils/request'

// 查询员工考勤列表
export function listAttend(query) {
  return request({
    url: '/office/attend/list',
    method: 'get',
    params: query
  })
}

// 查询员工考勤详细
export function getAttend(attendId) {
  return request({
    url: '/office/attend/' + attendId,
    method: 'get'
  })
}

// 新增员工考勤
export function addAttend(data) {
  return request({
    url: '/office/attend',
    method: 'post',
    data: data
  })
}

// 修改员工考勤
export function updateAttend(data) {
  return request({
    url: '/office/attend',
    method: 'put',
    data: data
  })
}

// 删除员工考勤
export function delAttend(attendId) {
  return request({
    url: '/office/attend/' + attendId,
    method: 'delete'
  })
}

//获取员工打卡日期
export function getDateList(userName) {
  return request({
    url: '/office/attend/Date/' + userName,
    method: 'get'
  })
}
