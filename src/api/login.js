import request from '../utils/request';

export function oauthGomeInfo(data) {
  data = Object.assign(data, {
    clientCode: "APPLET"
  })
  return request.post('/app/oauth/gome/login', data)
}
