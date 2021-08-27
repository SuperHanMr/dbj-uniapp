import request from '../utils/request';

export function oauthGomeInfo (data) {
	return request.post('/app/oauth/gome/login', data)
}