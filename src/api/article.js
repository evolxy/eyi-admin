import request from '@/utils/request'
const url = '/admin/article'
const apiUrl = '/api/article'
export function saveArticle (formData) {
  return request({
    url: url,
    method: 'post',
    data: formData
  })
}

export function updArticle (formData) {
  return request({
    url: url,
    method: 'put',
    data: formData
  })
}

export function articleList (params) {
  return request({
    url: url + '/page',
    method: 'get',
    params: params
  })
}

export function removeArticle (id) {
  return request({
    url: url + '/' + id,
    method: 'delete'
  })
}

export function articleDetail (articleId) {
  return request({
    url: url + '/' + articleId,
    method: 'get'
  })
}

export function apiArticleList (params) {
  return request({
    url: apiUrl + '/list',
    method: 'get',
    params: params
  })
}
