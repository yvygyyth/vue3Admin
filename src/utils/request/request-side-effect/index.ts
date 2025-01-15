import EventBus from '@/hooks/useEventBus'
import { singleton } from '@/utils/singleton'

export const eventBus = singleton(EventBus)
