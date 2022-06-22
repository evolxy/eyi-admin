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

export function login (data) {
  return request({
    url: url + '/login',
    data: data,
    method: 'post'
  })
}

export function logout () {
  return request({
    url: url + '/logout',
    method: 'post'
  })
}

export function userInfo () {
  return request({
    url: url + '/userInfo',
    method: 'get'
  })
}
