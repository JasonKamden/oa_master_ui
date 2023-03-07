import request from '@/utils/request'

// 查询合同支付列表
export function listPay(query) {
  return request({
    url: '/contract/pay/list',
    method: 'get',
    params: query
  })
}

// 查询合同支付详细
export function getPay(recordId) {
  return request({
    url: '/contract/pay/' + recordId,
    method: 'get'
  })
}

// 新增合同支付
export function addPay(data) {
  return request({
    url: '/contract/pay',
    method: 'post',
    data: data
  })
}

// 修改合同支付
export function updatePay(data) {
  return request({
    url: '/contract/pay',
    method: 'put',
    data: data
  })
}

// 删除合同支付
export function delPay(recordId) {
  return request({
    url: '/contract/pay/' + recordId,
    method: 'delete'
  })
}
