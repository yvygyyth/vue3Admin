import type { FieldRule } from '@arco-design/web-vue'

export const rule: Record<string, FieldRule[]> = {
    name: [
        { required: true, message: '请输入角色名称' },
        { minLength: 2, message: '角色名称至少2个字符' },
        { maxLength: 50, message: '角色名称不能超过50个字符' }
    ],
    description: [
        { maxLength: 200, message: '角色描述不能超过200个字符' }
    ]
}
