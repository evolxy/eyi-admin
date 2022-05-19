import request from '@/utils/request'

export default {
  uploadImg (formData) {
    return request({
      url: '/admin/fdfs/upload',
      method: 'post',
      data: formData
    })
  }
}
