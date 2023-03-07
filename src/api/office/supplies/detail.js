import request from '@/utils/request'

// 查询物资详情列表
export function listDetail(query) {
  return request({
    url: '/supplies/detail/list',
    method: 'get',
    params: query
  })
}

// 查询物资详情详细
export function getDetail(suppliesId) {
  return request({
    url: '/supplies/detail/' + suppliesId,
    method: 'get'
  })
}

// 新增物资详情
export function addDetail(data) {
  return request({
    url: '/supplies/detail',
    method: 'post',
    data: data
  })
}

// 修改物资详情
export function updateDetail(data) {
  return request({
    url: '/supplies/detail',
    method: 'put',
    data: data
  })
}

// 删除物资详情
export function delDetail(suppliesId) {
  return request({
    url: '/supplies/detail/' + suppliesId,
    method: 'delete'
  })
}
