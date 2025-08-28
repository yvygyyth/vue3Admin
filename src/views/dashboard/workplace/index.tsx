import { defineComponent } from 'vue'
import { ViewNames } from '@/types/constants'

export default defineComponent({
  name: ViewNames.workplace,
  setup() {
    return () => (
      <div class="flex">
       欢迎使用
      </div>
    )
  }
})
