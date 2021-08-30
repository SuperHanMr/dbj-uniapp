import request from '../utils/request';

//获取banner列表
export function getBanner(params){
    return request.get(`/app/banner/list`,{params});
}

//直播与回放+预告
export function queryLive(params){
    return request.get(`/app/publicRoom/queryLive/0`,{params});
}