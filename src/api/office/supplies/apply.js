import request from '@/utils/request'

// 查询物资申请列表
export function listApply(query) {
  return request({
    url: '/supplies/apply/list',
    method: 'get',
    params: query
  })
}

// 查询物资申请详细
export function getApply(suppliesId) {
  return request({
    url: '/supplies/apply/' + suppliesId,
    method: 'get'
  })
}

// 新增物资申请
export function addApply(data) {
  return request({
    url: '/supplies/apply',
    method: 'post',
    data: data
  })
}

// 修改物资申请
export function updateApply(data) {
  return request({
    url: '/supplies/apply',
    method: 'put',
    data: data
  })
}

// 删除物资申请
export function delApply(suppliesId) {
  return request({
    url: '/supplies/apply/' + suppliesId,
    method: 'delete'
  })
}
