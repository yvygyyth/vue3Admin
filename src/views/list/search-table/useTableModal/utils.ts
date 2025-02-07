import { type Ref } from 'vue'
import { type FormData, TableEventBus } from '../tableStore'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { Message } from '@arco-design/web-vue'
import { requestSave } from '../tableStore'

export const requestCallBack = async (title: string, formData: Ref<FormData>) => {
  const events = new TableEventBus()
  await requestSave(formData.value)
  events.emit(EBE.resetPagination)
  events.emit(EBE.fetchData)
  Message.success(`${title}成功`)
}
