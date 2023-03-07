import request from '@/utils/request'

// 查询会议纪要列表
export function listNotes(query) {
  return request({
    url: '/meeting/notes/list',
    method: 'get',
    params: query
  })
}

// 查询会议纪要详细
export function getNotes(notesId) {
  return request({
    url: '/meeting/notes/' + notesId,
    method: 'get'
  })
}

// 新增会议纪要
export function addNotes(data) {
  return request({
    url: '/meeting/notes',
    method: 'post',
    data: data
  })
}

// 修改会议纪要
export function updateNotes(data) {
  return request({
    url: '/meeting/notes',
    method: 'put',
    data: data
  })
}

// 删除会议纪要
export function delNotes(notesId) {
  return request({
    url: '/meeting/notes/' + notesId,
    method: 'delete'
  })
}
