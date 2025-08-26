import { ViewNames } from '@/types/constants'
import LoginForm from '@/views/login/LoginForm'
import { defineComponent } from 'vue'
export default defineComponent({
  name: ViewNames.login,
  setup() {
    return () => (
      <div class="min-h-screen flex">
        <div class="flex-1 justify-center items-center flex">
          <LoginForm></LoginForm>
        </div>
      </div>
    )
  }
})
