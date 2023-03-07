import request from '@/utils/request'

// 查询日常任务列表
export function listDaily(query) {
  return request({
    url: '/office/daily/list',
    method: 'get',
    params: query
  })
}

// 查询日常任务详细
export function getDaily(taskId) {
  return request({
    url: '/office/daily/' + taskId,
    method: 'get'
  })
}

// 新增日常任务
export function addDaily(data) {
  return request({
    url: '/office/daily',
    method: 'post',
    data: data
  })
}

// 修改日常任务
export function updateDaily(data) {
  return request({
    url: '/office/daily',
    method: 'put',
    data: data
  })
}

// 删除日常任务
export function delDaily(taskId) {
  return request({
    url: '/office/daily/' + taskId,
    method: 'delete'
  })
}
