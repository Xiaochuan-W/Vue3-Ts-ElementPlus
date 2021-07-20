import request from '@/utils/request'
import { Product } from '@/types/interface/formFace'

export function insertProduct(data:any) {
  return request({
    url: `api/v3/kline`,
    method: 'get',
    data
  })
}