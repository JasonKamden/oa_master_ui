import request from '@/utils/request'

// 查询任务进度列表
export function listInfo(query) {
  return request({
    url: '/task/info/list',
    method: 'get',
    params: query
  })
}

// 查询任务进度详细
export function getInfo(taskId) {
  return request({
    url: '/task/info/' + taskId,
    method: 'get'
  })
}

// 新增任务进度
export function addInfo(data) {
  return request({
    url: '/task/info',
    method: 'post',
    data: data
  })
}

// 修改任务进度
export function updateInfo(data) {
  return request({
    url: '/task/info',
    method: 'put',
    data: data
  })
}

// 删除任务进度
export function delInfo(taskId) {
  return request({
    url: '/task/info/' + taskId,
    method: 'delete'
  })
}
