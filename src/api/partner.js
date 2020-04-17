import request from '@/utils/request'

export function getUser() {
  return request({
    url: '/partner/add',
    method: 'get'
  })
}

export function submitUser(data) {
  return request({
    url: '/partner/add',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/partner/list',
    method: 'post',
    data
  })
}

export function getList() {
  return request({
    url: '/partner/list',
    method: 'get'
  })
}
