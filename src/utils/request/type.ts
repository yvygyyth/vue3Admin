import { COUNT_SYMBOL } from "@/types/global";

// 通用响应类型
export interface ApiResponse<T = any> {
	code: number;
	data: T;
	count?: number;
	msg: string;
}

export type DataWithCount<T> = T & {
    [COUNT_SYMBOL]?: number;
}