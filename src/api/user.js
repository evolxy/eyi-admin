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

export function securityInfo () {
  return request({
    url: url + '/addition',
    method: 'get'
  })
}

export function changePass (data) {
  return request({
    url: url + '/changePasswd',
    method: 'post',
    data
  })
}

export function changeAdditionalInfo (data) {
  return request({
    url: url + '/change',
    method: 'post',
    data
  })
}

export function stationMasterInfo () {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
