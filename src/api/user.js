import request from '@/utils/request'
const url = '/admin/user'

export function updateInfo (data) {
  return request({
    url: url,
    data: data,
    method: 'post'
  })
}

export function captcha (param) {
  return request({
    url: url + '/' + 'captcha',
    method: 'get',
    params: param
  })
}
