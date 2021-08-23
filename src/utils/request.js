import axios from '@/js_sdk/gangdiedao-uni-axios'



/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
	const pages = getCurrentPages();
	const currentPage = pages?. [(pages?.length ?? 1) - 1];
	uni.redirectTo({
		url: `/pages/home/index?redirect=${encodeURIComponent(`/${currentPage?.route ?? ''}`)}`,
	});
};

function getRequestKey(config) {
	return [
		config.method?.toLowerCase(),
		config.url,
		JSON.stringify(config.data),
		JSON.stringify(config.params)
	].join("--");
}

let failRequestList = [];
let retryMap = new Map();

function retryAllFailRequest() {
	failRequestList.forEach(info => {
		//每个请求最多重试3次
		let requestKey = getRequestKey(info.config);
		let retryTimes = retryMap.get(requestKey);
		if (!retryTimes) {
			retryTimes = 1;
			retryMap.set(requestKey, retryTimes);
		} else if (retryTimes >= 3) {
			retryMap.delete(requestKey);
			return;
		} else {
			retryMap.set(requestKey, retryTimes + 1);
		}
		service(info.config)
			.then(info.resolve)
			.catch(info.reject);
	});
	failRequestList = [];
}

// 创建axios实例
const instance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 1000 * 5,

});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
	async (config) => {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			const userInfo = getApp().globalData.userInfo;


			if (userInfo) {
				config.headers = {
					...(config.headers ?? {}),
					accessToken: `${user.accessToken}`,
				};
			}
			return config;
		},
		(error) => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
	// 请求成功
	async (res) => {
			uni.hideLoading();

			if (res.data.code !== 1) {
				return Promise.reject(res)
			} else {
				return res
			}
		},
		// 请求失败
		(error) => {
			uni.hideLoading();
			console.log("response-error:", error.response.status);
			if (error.response.status === 401) {
				return new Promise((resolve, reject) => {
					failRequestList.push({
						config: error.config,
						resolve: resolve,
						reject: reject
					});
					// window._APP_EVENT_onNewToken = function(token) {
					// 	if (token) {
					// 		setAccessToken(token);
					// 		retryAllFailRequest();
					// 	}
					// }
					// window._APP_ACTION_getNewToken.postMessage(JSON.stringify({
					// 	token: requestConfig.accessToken || ""
					// }));
				})
			}
			console.error("------response-error-----", error);
			return Promise.reject(error.response);
		},
);

export default instance;
