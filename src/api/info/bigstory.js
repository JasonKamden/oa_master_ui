import request from '@/utils/request'

// 查询大事记管理列表
export function listBigstory(query) {
  return request({
    url: '/info/bigstory/list',
    method: 'get',
    params: query
  })
}

// 查询大事记管理详细
export function getBigstory(attachId) {
  return request({
    url: '/info/bigstory/' + attachId,
    method: 'get'
  })
}

// 新增大事记管理
export function addBigstory(data) {
  return request({
    url: '/info/bigstory',
    method: 'post',
    data: data
  })
}

// 修改大事记管理
export function updateBigstory(data) {
  return request({
    url: '/info/bigstory',
    method: 'put',
    data: data
  })
}

// 删除大事记管理
export function delBigstory(attachId) {
  return request({
    url: '/info/bigstory/' + attachId,
    method: 'delete'
  })
}
