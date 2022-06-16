import request from '@/utils/request'

export default {
  uploadImg (formData) {
    return request({
      url: '/store/file',
      method: 'post',
      data: formData
    })
  }
}
