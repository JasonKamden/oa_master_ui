import request from '@/utils/request'

// 查询工资详情列表
export function listInfo(query) {
  return request({
    url: '/salary/info/list',
    method: 'get',
    params: query
  })
}

// 查询工资详情详细
export function getInfo(id) {
  return request({
    url: '/salary/info/' + id,
    method: 'get'
  })
}

// 新增工资详情
export function addInfo(data) {
  return request({
    url: '/salary/info',
    method: 'post',
    data: data
  })
}

// 修改工资详情
export function updateInfo(data) {
  return request({
    url: '/salary/info',
    method: 'put',
    data: data
  })
}

// 删除工资详情
export function delInfo(id) {
  return request({
    url: '/salary/info/' + id,
    method: 'delete'
  })
}
