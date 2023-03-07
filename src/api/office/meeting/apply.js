import request from '@/utils/request'

// 查询会议申请列表
export function listApply(query) {
  return request({
    url: '/meeting/apply/list',
    method: 'get',
    params: query
  })
}

// 查询会议申请详细
export function getApply(meetingId) {
  return request({
    url: '/meeting/apply/' + meetingId,
    method: 'get'
  })
}

// 新增会议申请
export function addApply(data) {
  return request({
    url: '/meeting/apply',
    method: 'post',
    data: data
  })
}

// 修改会议申请
export function updateApply(data) {
  return request({
    url: '/meeting/apply',
    method: 'put',
    data: data
  })
}

// 删除会议申请
export function delApply(meetingId) {
  return request({
    url: '/meeting/apply/' + meetingId,
    method: 'delete'
  })
}
