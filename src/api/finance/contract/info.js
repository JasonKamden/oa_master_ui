import request from '@/utils/request'

// 查询合同详情列表
export function listInfo(query) {
  return request({
    url: '/contract/info/list',
    method: 'get',
    params: query
  })
}

// 查询合同详情详细
export function getInfo(infoId) {
  return request({
    url: '/contract/info/' + infoId,
    method: 'get'
  })
}

// 新增合同详情
export function addInfo(data) {
  return request({
    url: '/contract/info',
    method: 'post',
    data: data
  })
}

// 修改合同详情
export function updateInfo(data) {
  return request({
    url: '/contract/info',
    method: 'put',
    data: data
  })
}

// 删除合同详情
export function delInfo(infoId) {
  return request({
    url: '/contract/info/' + infoId,
    method: 'delete'
  })
}
