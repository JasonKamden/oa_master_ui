import request from '@/utils/request'

// 查询合同列表
export function listCreate(query) {
  return request({
    url: '/contract/create/list',
    method: 'get',
    params: query
  })
}

// 查询合同详细
export function getCreate(contractId) {
  return request({
    url: '/contract/create/' + contractId,
    method: 'get'
  })
}

// 新增合同
export function addCreate(data) {
  return request({
    url: '/contract/create',
    method: 'post',
    data: data
  })
}

// 修改合同
export function updateCreate(data) {
  return request({
    url: '/contract/create',
    method: 'put',
    data: data
  })
}

// 删除合同
export function delCreate(contractId) {
  return request({
    url: '/contract/create/' + contractId,
    method: 'delete'
  })
}
