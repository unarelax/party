import request from '@/utils/request'

export function submit(data) {
  return request({
    url: '/party/create',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/party/list',
    method: 'post',
    data
  })
}

export function getParty() {
  return request({
    url: '/party/list',
    method: 'get'
  })
}

