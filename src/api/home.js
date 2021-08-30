import request from '../utils/request';

//获取banner列表
export function getBanner(params){
    return request.get(`/app/banner/list`,{params});
}

//APP 直播+预告+回放列表
export function queryLive(params){
    return request.get(`/app/publicRoom/queryLiveList`,{params});
}