import request from '@/utils/request'

export function addType(data) {
  return request({
    url: 'type/addType',
    method: 'post',
    data
  })
}

export function editType(data) {
  return request({
    url: 'type/editType',
    method: 'put',
    data
  })
}


export function getType(data) {
  return request({
    url: 'type/getType',
    method: 'post',
    data
  })
}


export function getAllType() {
  return request({
    url: 'type/getAllType',
    method: 'get'
  })
}



export function delType(id) {
  return request({
    url: 'type/delType/' + id,
    method: 'delete'
  })
}

