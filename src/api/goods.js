import request from '@/utils/request'

export function listGoods(query) {
  return request({
    url: '/goods',
    method: 'get',
    params: query
  })
}

export function createGoods(data) {
  return request({
    url: '/goods/add',
    method: 'post',
    data
  })
}

export function deleteGoods(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

/**
 * 客户浏览商品接口
 * @param {*} query 
 * @returns 
 */
export function viewGoods(query) {
  return request({
    url: '/goods/view',
    method: 'get',
    params: query
  })
}