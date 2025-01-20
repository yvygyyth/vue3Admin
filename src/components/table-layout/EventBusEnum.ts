export enum EBE {
  fetchData, // 获取数据
  resetSearchQuery, //重置表单
  resetPagination // 分页初始化
}

export type EventPayloads = {
  [EBE.fetchData]: void
  [EBE.resetSearchQuery]: void
  [EBE.resetPagination]: void
}
