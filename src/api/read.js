import request from '@/utils/request'



export function addRead(data) {
    return request({
      url: 'read/addRead',
      method: 'post',
      data
    })
  }
  
  export function editRead(data) {
    return request({
      url: 'read/editRead',
      method: 'put',
      data
    })
  }
  
  
  export function getRead(data) {
    return request({
      url: 'read/getRead',
      method: 'post',
      data
    })
  }
  
  
  export function getAllRead() {
    return request({
      url: 'read/getAllRead',
      method: 'get'
    })
  }
  
  
  
  export function delRead(id) {
    return request({
      url: 'read/delRead/' + id,
      method: 'delete'
    })
  }
  