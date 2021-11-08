import {request} from './request'

// banners 和 recommends 数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// goods 数据
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}