import request from '../utils/request';

export function oauthGomeInfo(data) {
  data = Object.assign(data, {
    clientCode: "APPLET",
		ignoreLogin: true
  })
  return request.post('/app/oauth/gome/login', data)
}
//编辑房屋
export function bindCapsule(params) {
  return request.put("/capsule-shop/app/customer/create", params)
}


