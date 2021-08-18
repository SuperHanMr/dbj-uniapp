import axios from '@/js_sdk/gangdiedao-uni-axios'



/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    const pages = getCurrentPages();
    const currentPage = pages?.[(pages?.length ?? 1) - 1];
    uni.redirectTo({
        url: `/pages/home/index?redirect=${encodeURIComponent(`/${currentPage?.route ?? ''}`)}`,
    });
};

// 创建axios实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 45,
	
});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    async (config) => {
        uni.showLoading({ title: '加载中...', mask: true });

        // const userInfo = await user.getUserInfo();

        // if (userInfo) {
        //     config.headers = {
        //         ...(config.headers ?? {}),
        //         authorization: `bearer ${user.accessToken}`,
        //     };
        // }
        return config;
    },
    (error) => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    async (res) => {
        uni.hideLoading();
		
        // if (res.status === 200 || res.status === 201) {
        //     return res.data;
        // } else {
        //     const message = res?.data?.message ?? res?.data?.statusText;
        //     uni.showToast({ title: message, icon: 'none' });
        //     return Promise.reject(message ?? res);
        // }
        return res.data;
    },
    // 请求失败
    (error) => {
        uni.hideLoading();
        // const message = error?.response?.data?.message ?? error?.response?.statusText;
        // uni.showToast({ title: message, icon: 'none' });
        // return Promise.reject(message ?? error);
    },
);

export default instance;