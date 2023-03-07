import request from '@/utils/request'

// 查询物资列表
export function listEntry(query) {
  return request({
    url: '/supplies/entry/list',
    method: 'get',
    params: query
  })
}

// 查询物资详细
export function getEntry(sortId) {
  return request({
    url: '/supplies/entry/' + sortId,
    method: 'get'
  })
}

// 新增物资
export function addEntry(data) {
  return request({
    url: '/supplies/entry',
    method: 'post',
    data: data
  })
}

// 修改物资
export function updateEntry(data) {
  return request({
    url: '/supplies/entry',
    method: 'put',
    data: data
  })
}

// 删除物资
export function delEntry(sortId) {
  return request({
    url: '/supplies/entry/' + sortId,
    method: 'delete'
  })
}
