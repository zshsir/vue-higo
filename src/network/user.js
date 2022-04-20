import { request } from './request.js'

//注册
export function register(data){
    return request({
        url:'/api/auth/register',
        method:'POST',
        data,
    })
}
//登入
export function login(data){
    return request({
        url:'/api/auth/login',
        method:'POST',
        data,
    })
}

//退出
export function logout(data){
    return request({
        url:'/api/auth/logout',
        method:'POST',
    })
}
