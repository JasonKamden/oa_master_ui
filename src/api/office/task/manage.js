import request from '@/utils/request'

// 查询任务列表
export function listManage(query) {
  return request({
    url: '/task/manage/list',
    method: 'get',
    params: query
  })
}

// 查询任务详细
export function getManage(taskId) {
  return request({
    url: '/task/manage/' + taskId,
    method: 'get'
  })
}

// 新增任务
export function addManage(data) {
  return request({
    url: '/task/manage',
    method: 'post',
    data: data
  })
}

// 修改任务
export function updateManage(data) {
  return request({
    url: '/task/manage',
    method: 'put',
    data: data
  })
}

// 删除任务
export function delManage(taskId) {
  return request({
    url: '/task/manage/' + taskId,
    method: 'delete'
  })
}
