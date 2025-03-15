import { useConfig } from './uploader/index'
import SimpleFileUploader from './uploader/simpleFileUploader'
import BigFileUploader from './uploader/bigFileUploader'

export function createFileUploader(file: File) {
  const config = useConfig()
  if (file.size > config.maxSize) {
    return new BigFileUploader(file)
  } else {
    return new SimpleFileUploader(file)
  }
}
