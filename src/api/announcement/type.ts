import type { PageLimit } from '@/types/global'
import type { AnnouncementType } from './enum'


// 公告实体类型
export interface Announcement {
    id: number;
    hash: string;
    exchange_code: number;
    type: AnnouncementType;
    original_type?: string | number;  // 原始类型（交易所发来的原始公告类型）
    title: string;
    title_zh:string;
    description: string;
    publish_time: number;
    fetch_time: number;
    url: string;
}

// 查询参数类型
export interface AnnouncementQueryParams extends PageLimit {
    exchange_code?: number;
    type?: AnnouncementType; // 添加公告类型筛选
    time_range?: [number, number] | []; // [开始时间, 结束时间]
    keywords?: string; // 模糊查询关键词（搜索标题和描述）
}
