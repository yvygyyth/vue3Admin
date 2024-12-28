import type { PolicyQuery } from '@/api/list'
import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import {
  Button,
  Form,
  Grid,
  Input,
  RangePicker,
  Select,
  type FormInstance,
  type SelectOptionData
} from '@arco-design/web-vue'
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import { computed, defineComponent, ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
import usePermission from '@/hooks/permission'

export default defineComponent({
  name: 'TableActionArea',
  emits: [],
  props: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const { currentLocale } = useLocale()
    const { checkButtonPermission } = usePermission()
    const TableActionButtons = () => []

    const TableSettings = () => []
  }
})
