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
	console.log('retry!!!!!!!!!!!!!!!!!!!!');
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
		instance(info.config)
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
			const token = getApp().globalData.token;

			if (token) {
				config.headers = {
					...(config.headers ?? {}),
					accessToken: `${token}`,
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
				if (res.data && res.data.data) {
					return res.data.data;
				}
				return res.data;
			}
		},
		// 请求失败
		(error) => {
			uni.hideLoading();
			if (error.response && error.response.status === 401) {
				//刷新token
				refrishToken();
				return new Promise((resolve, reject) => {
					failRequestList.push({
						config: error.config,
						resolve: resolve,
						reject: reject
					});
					//重新请求接口
					retryAllFailRequest();
				})
			} else if (error.response && error.response.status === 3504) {
				uni.showModal({
				    title: '提示',
				    content: '用户信息已过期,请重新登录',
				    success: function (res) {
				       uni.navigateTo({
				       	url:"/src/pages/login/login.vue"
				       })
				    }
				});
			}
			console.error("------response-error-----", error);
			return Promise.reject(error.response);
		},
);
async function refrishToken() {
	let res = await instance.post('/app/oauth/gome/login', {
		clientType: 3
	});
}

export default instance;
