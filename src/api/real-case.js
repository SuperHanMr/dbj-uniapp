import request from '../utils/request';

export function getCaseList(params){
    return request.get(`/app/case/v2/list`,{params});
}
