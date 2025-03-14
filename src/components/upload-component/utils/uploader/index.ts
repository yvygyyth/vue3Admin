import type { UploadProps } from './types'

let uploadConfig: UploadProps
export const inject = (config: UploadProps) => {
  uploadConfig = config
}

function useConfig(): UploadProps {
  return uploadConfig
}

export { useConfig }
