import request from '@/utils/request'

export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data
  })
}
