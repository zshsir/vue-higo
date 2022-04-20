import { request } from './request.js'

export function getDetail(id){
    return request({
        url:'/api/goods/'+id,
    })
    
}