import request from '@/utils/request'

export function saveArticle (formData) {
  return request({
    url: '/admin/article',
    method: 'post',
    data: formData
  })
}
export function articleList (params) {
  return request({
    url: '/admin/article/page',
    method: 'get',
    params: params
  })
}
