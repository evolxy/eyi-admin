import request from '@/utils/request'

export function uploadImg (formData) {
  return request({
    url: '/store/file',
    method: 'post',
    data: formData
  })
}
