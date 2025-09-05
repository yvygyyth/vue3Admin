import type { FieldRule } from '@arco-design/web-vue'

export const rule: Record<string, FieldRule[]> = {
    code: [
        { required: true, message: '请输入权限代码' }
    ],
    name: [
        { required: true, message: '请输入权限名称' }
    ],
    type: [
        { required: true, message: '请选择权限类型' }
    ]
}
