import { COUNT_SYMBOL } from '@/types/global';
import { DependencyHub, Keys } from "@/hooks/useRequestInjectorManager";
import type { ApiResponse, DataWithCount } from './type';
import { Message } from '@arco-design/web-vue'

// 请求拦截器
export const requestInterceptor = async (config: any) => {
	// 可以在这里添加默认的请求头、认证信息等
	// 例如：添加token
	// if (token) {
	//   config.headers.Authorization = `Bearer ${token}`;
	// }
	const token = await DependencyHub.getAndCall(Keys.getToken);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	
	// 可以添加loading状态
	// showLoading();
	
	return config;
};

// 请求错误拦截器
export const requestErrorInterceptor = (error: any) => {
	console.error('请求拦截器错误:', error);
	// 可以在这里处理请求错误，比如隐藏loading
	// hideLoading();
	return Promise.reject(error);
};

// 响应拦截器
export const responseInterceptor = <T = any>(response: ApiResponse) => {
	const res = response.data;
	if (res && typeof res.count === 'number') {
		(res.data as any)[COUNT_SYMBOL] = res.count;
		console.log('response.count',res)
	}
	return res as DataWithCount<T>;
};

// 响应错误拦截器
export const responseErrorInterceptor = (error: any) => {
	Message.error(error.response.data.msg)
	// 可以在这里处理错误，比如显示错误提示
	// showError(errorResponse.msg);
	
	return Promise.reject(error.response);
};

// 设置axios拦截器的函数
export const setupAxiosInterceptors = (axiosInstance: any) => {
	// 请求拦截器
	axiosInstance.interceptors.request.use(
		requestInterceptor,
		requestErrorInterceptor
	);

	// 响应拦截器
	axiosInstance.interceptors.response.use(
		responseInterceptor,
		responseErrorInterceptor
	);
};
