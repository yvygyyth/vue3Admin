import { inject } from '../request-core'
import { requestor } from '../request-imp/request-axios-imp'
import { sideEffectInit } from '../request-side-effect'

inject(requestor)
sideEffectInit()
