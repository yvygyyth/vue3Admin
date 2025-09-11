// 公告类型枚举
export enum AnnouncementType {
    LISTING = 1,          // 上线/新币/上市公告
    DELISTING = 2,        // 下架/退市公告
    MAINTENANCE = 3,      // 系统维护/交易暂停
    SECURITY = 4,         // 安全事件/风险提示
    REGULATION = 5,       // 法规/合规/政策公告
    PROMOTION = 6,        // 活动/优惠/奖励公告
    TRADING_RULES = 7,    // 交易规则变更/手续费/杠杆调整
    PARTNERSHIP = 8,      // 合作/战略公告
    OTHER = 0             // 其他/未分类
}

export const AnnouncementTypeMap = new Map<AnnouncementType, string>([
    [AnnouncementType.LISTING, '上线'],
    [AnnouncementType.DELISTING, '下线'],
    [AnnouncementType.MAINTENANCE, '系统维护'],
    [AnnouncementType.SECURITY, '安全事件'],
    [AnnouncementType.REGULATION, '法规'],
    [AnnouncementType.PROMOTION, '活动'],
    [AnnouncementType.TRADING_RULES, '交易规则'],
    [AnnouncementType.PARTNERSHIP, '合作'],
    [AnnouncementType.OTHER, '其他'],
])

export enum ExchangeCode{
    Binance = 1,
    Bitget = 6,
    Bybit = 4,
    Gate = 5,
    Htx = 3,
    Okx = 2,
}

export const ExchangeCodeName = new Map<ExchangeCode, string>([
    [ExchangeCode.Binance, '币安'],
    [ExchangeCode.Okx, 'Okx'],
    [ExchangeCode.Bybit, 'Bybit'],
    [ExchangeCode.Htx, '火币'],
    [ExchangeCode.Bitget, 'Bitget'],
    [ExchangeCode.Gate, 'Gate'],
]);