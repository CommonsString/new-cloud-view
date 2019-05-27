import request from '@/utils/request'

export function getAllMsg(data) {
    return request({
      url: 'content/getAllMsg',
      method: 'post',
      data
    })
  }

  export function getAll() {
    return request({
      url: 'content/getAll',
      method: 'get'
    })
  }


  export function delMsg(id) {
    return request({
      url: 'content/delMsg/' + id,
      method: 'delete'
    })
  }