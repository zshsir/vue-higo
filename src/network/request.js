import router from '@/router';
import axios from 'axios'
import { Dialog, Toast } from 'vant';

export function request(config){
    const instance = axios.create({
        baseURL:'https://api.shop.eduwork.cn',
        timeout:5000
    })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //如果一些接口需要认证才可以访问，就在这里统一设置
        const token = window.localStorage.getItem('token');
        if(token){
            config.headers.Authorization = 'Bearer '+ token;
        }
        //直接放行
        return config;
    },err=>{})

    //响应拦截

    instance.interceptors.response.use(res=>{
        return res.data ? res.data : res;
    },err=>{
        //如果有需要才可以访问的接口，统一去login授权
        if(err.response.status == '401'){
            Toast.fail('请先登入')
            router.push({path:'/login'})
        }
        //如果有错误 这里面处理
        Dialog({message:err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]})

    })

    return instance(config)

}