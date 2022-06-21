import request from '@/utils/request'

export function uploadImg (formData) {
  return request({
    url: '/store/file',
    method: 'post',
    data: formData
  })
}

export function uploadAll (formData) {
  return request({
    url: '/store/file/all',
    method: 'post',
    data: formData
  })
}
