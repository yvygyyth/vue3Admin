<template>
    <div class="announcement-detail">
        <a-descriptions :column="1" bordered>
            <a-descriptions-item label="ID">
                {{ record.id }}
            </a-descriptions-item>
            <a-descriptions-item label="交易所">
                {{ ExchangeCodeName.get(record.exchange_code) }}
            </a-descriptions-item>
            <a-descriptions-item label="公告类型">
                {{ AnnouncementTypeMap.get(record.type) }}
            </a-descriptions-item>
            <a-descriptions-item label="标题">
                {{ record.title_zh || record.title }}
            </a-descriptions-item>
            <a-descriptions-item label="英文标题" v-if="record.title_zh && record.title !== record.title_zh">
                {{ record.title }}
            </a-descriptions-item>
            <a-descriptions-item label="描述" v-if="record.description">
                <div class="description-content">
                    {{ record.description }}
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="原文链接">
                <a :href="record.url" target="_blank" class="url-link">
                    {{ record.url }}
                    <icon-external />
                </a>
            </a-descriptions-item>
            <a-descriptions-item label="发布时间">
                {{ formatDateTimeMillis(record.publish_time) }}
            </a-descriptions-item>
            <a-descriptions-item label="抓取时间">
                {{ formatDateTimeMillis(record.fetch_time) }}
            </a-descriptions-item>
            <a-descriptions-item label="Hash值">
                <code class="hash-code">{{ record.hash }}</code>
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script setup lang="ts">
import { AnnouncementTypeMap, ExchangeCodeName, type Announcement } from '@/api/announcement'
import { formatDateTimeMillis } from '@/utils/format'
import IconExternal from '@arco-design/web-vue/es/icon/index'

interface Props {
    record: Announcement
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.announcement-detail {
    .description-content {
        max-height: 300px;
        overflow-y: auto;
        line-height: 1.6;
        word-break: break-word;
    }
    
    .url-link {
        // color: var(--color-primary-6);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        
        &:hover {
            color: var(--color-primary-5);
            text-decoration: underline;
        }
    }
    
    .hash-code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        background-color: var(--color-fill-2);
        padding: 2px 6px;
        border-radius: 4px;
        word-break: break-all;
    }
}
</style>
