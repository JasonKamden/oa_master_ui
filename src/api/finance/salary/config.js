import request from '@/utils/request'

// 查询工资配置列表
export function listConfig(query) {
  return request({
    url: '/salary/config/list',
    method: 'get',
    params: query
  })
}

// 查询工资配置详细
export function getConfig(id) {
  return request({
    url: '/salary/config/' + id,
    method: 'get'
  })
}

// 新增工资配置
export function addConfig(data) {
  return request({
    url: '/salary/config',
    method: 'post',
    data: data
  })
}

// 修改工资配置
export function updateConfig(data) {
  return request({
    url: '/salary/config',
    method: 'put',
    data: data
  })
}

// 删除工资配置
export function delConfig(id) {
  return request({
    url: '/salary/config/' + id,
    method: 'delete'
  })
}
