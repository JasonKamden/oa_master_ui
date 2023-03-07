import request from '@/utils/request'

// 查询用户会议列表
export function listUser(query) {
  return request({
    url: '/meeting/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户会议详细
export function getUser(meetingId) {
  return request({
    url: '/meeting/user/' + meetingId,
    method: 'get'
  })
}

// 新增用户会议
export function addUser(data) {
  return request({
    url: '/meeting/user',
    method: 'post',
    data: data
  })
}

// 修改用户会议
export function updateUser(data) {
  return request({
    url: '/meeting/user',
    method: 'put',
    data: data
  })
}

// 删除用户会议
export function delUser(meetingId) {
  return request({
    url: '/meeting/user/' + meetingId,
    method: 'delete'
  })
}

// 用户状态修改
export function changeUserStatus(meetingId,userId, status) {
  const data = {
    meetingId,
    userId,
    status
  }
  return request({
    url: '/meeting/user/changeStatus',
    method: 'put',
    data: data
  })
}

