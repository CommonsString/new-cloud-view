import request from '@/utils/request'

// 编辑页面-保存
export function saveContent(data) {
  return request({
    url: 'content/saveMsg',
    method: 'post',
    data
  })
}


// 新闻采集

export function upMsgFile(data) {
  return request({
    url: 'content/upMsgFile',
    method: 'post',
    data
  })
}

export function upfile(data) {
  return request({
    url: 'content/upfile',
    method: 'post',
    data
  })
}

// 新闻上传页面-保存
export function saveMsgContent(data) {
  return request({
    url: 'content/saveMsgContent',
    method: 'post',
    data
  })
}


// 返回10条最新记录
export function gitMsgLimitTen() {
  return request({
    url: 'content/getMsgTen',
    method: 'get'
  })
}



// 主页记录详情
export function updateMainIndex(id) {
  return request({
    url: 'content/updateMainIndex/' + id,
    method: 'put'
  })
}

export function handNotPassId(id) {
  return request({
    url: 'content/handNotPassId/' + id,
    method: 'put'
  })
}


//首页数据
export function getMainIndex() {
  return request({
    url: 'getInfo/getMainIndex',
    method: 'get'
  })
}


export function getEditIndex() {
  return request({
    url: 'getInfo/getEditIndex',
    method: 'get'
  })
}