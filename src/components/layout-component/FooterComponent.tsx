import { ApplicationInfo } from '@/types/constants'
import { LayoutFooter } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FooterComponent',
  setup() {
    return () => (
      <LayoutFooter class="flex h-10 justify-center items-center text-center text-[var(--color-text-2)]">
        {ApplicationInfo.APP_TITLE}
      </LayoutFooter>
    )
  }
})
