import request from '@/utils/request'

// 查询会议信息列表
export function listInfo(query) {
  return request({
    url: '/meeting/info/list',
    method: 'get',
    params: query
  })
}

// 查询会议信息详细
export function getInfo(roomId) {
  return request({
    url: '/meeting/info/' + roomId,
    method: 'get'
  })
}

// 新增会议信息
export function addInfo(data) {
  return request({
    url: '/meeting/info',
    method: 'post',
    data: data
  })
}

// 修改会议信息
export function updateInfo(data) {
  return request({
    url: '/meeting/info',
    method: 'put',
    data: data
  })
}

// 删除会议信息
export function delInfo(roomId) {
  return request({
    url: '/meeting/info/' + roomId,
    method: 'delete'
  })
}
