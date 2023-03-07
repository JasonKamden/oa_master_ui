import request from '@/utils/request'

// 查询文件管理列表
export function listManage(query) {
  return request({
    url: '/file/manage/list',
    method: 'get',
    params: query
  })
}

// 查询文件管理详细
export function getManage(fileId) {
  return request({
    url: '/file/manage/' + fileId,
    method: 'get'
  })
}

// 新增文件管理
export function addManage(data) {
  return request({
    url: '/file/manage',
    method: 'post',
    data: data
  })
}

// 修改文件管理
export function updateManage(data) {
  return request({
    url: '/file/manage',
    method: 'put',
    data: data
  })
}

// 删除文件管理
export function delManage(fileId) {
  return request({
    url: '/file/manage/' + fileId,
    method: 'delete'
  })
}
