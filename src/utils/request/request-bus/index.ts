import { inject } from '../request-core'
import { requestor } from '../request-imp/request-axios-imp'
import { useRequestor } from '../request-core'
inject(requestor)

export default useRequestor()
