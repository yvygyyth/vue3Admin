import type { FieldRule } from '@arco-design/web-vue'

export const addUserRules: Record<string, FieldRule[]> = {
    account: [
        { required: true, message: '请输入账号' },
        { minLength: 3, message: '账号至少3个字符' },
        { maxLength: 50, message: '账号不能超过50个字符' },
        { 
            match: /^[a-zA-Z0-9_]+$/, 
            message: '账号只能包含字母、数字和下划线' 
        }
    ],
    password: [
        { required: true, message: '请输入密码' },
        { minLength: 6, message: '密码至少6个字符' },
        { maxLength: 100, message: '密码不能超过100个字符' }
    ],
    nickname: [
        { maxLength: 50, message: '昵称不能超过50个字符' }
    ]
}
