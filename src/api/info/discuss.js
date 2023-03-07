import request from '@/utils/request'

// 查询讨论区列表
export function listDiscuss(query) {
  return request({
    url: '/info/discuss/list',
    method: 'get',
    params: query
  })
}

// 查询讨论区详细
export function getDiscuss(recordId) {
  return request({
    url: '/info/discuss/' + recordId,
    method: 'get'
  })
}

// 新增讨论区
export function addDiscuss(data) {
  return request({
    url: '/info/discuss',
    method: 'post',
    data: data
  })
}

// 修改讨论区
export function updateDiscuss(data) {
  return request({
    url: '/info/discuss',
    method: 'put',
    data: data
  })
}

// 删除讨论区
export function delDiscuss(recordId) {
  return request({
    url: '/info/discuss/' + recordId,
    method: 'delete'
  })
}
