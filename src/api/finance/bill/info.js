import request from '@/utils/request'

// 查询票据详情列表
export function listInfo(query) {
  return request({
    url: '/bill/info/list',
    method: 'get',
    params: query
  })
}

// 查询票据详情详细
export function getInfo(billId) {
  return request({
    url: '/bill/info/' + billId,
    method: 'get'
  })
}

// 新增票据详情
export function addInfo(data) {
  return request({
    url: '/bill/info',
    method: 'post',
    data: data
  })
}

// 修改票据详情
export function updateInfo(data) {
  return request({
    url: '/bill/info',
    method: 'put',
    data: data
  })
}

// 删除票据详情
export function delInfo(billId) {
  return request({
    url: '/bill/info/' + billId,
    method: 'delete'
  })
}
