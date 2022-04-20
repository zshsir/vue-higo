import { request } from './request.js'

export function getHomeAllData(){
    return request({
        url:'/api/index',
    })
}

export function getHomeGoods(type="sales",page=1){
    return request({
        url:'/api/index?'+type+'=1&page='+page,
    })
}

export function getBanner(){
    
}