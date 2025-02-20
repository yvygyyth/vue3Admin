import { uploadFile, mergeFiles } from '@/api/upload'
import { createFormData } from './file'
import md5 from 'js-md5'
import Task from './Task'
import { extname } from './file'
import type { Uploader, UploadTask, UploadProps, ProgressInfo } from '../types/index'
import { STATUS, progressDefault } from '../types/http'
import { useConfig } from './uploader/uploader-core/index'
import { ref, reactive, markRaw, type Ref } from 'vue'

class SimpleFileUploader implements Uploader {
  private _progressInfo = reactive({ ...progressDefault })
  private _status = STATUS.PENDING
  public tasks: UploadTask[] = []

  constructor(public file: File) {}

  async start() {
    try {
      this._status = STATUS.UPLOADING
      await this.uploadFile()
      this._status = STATUS.SUCCESS
    } catch (e) {
      console.error('开始上传', e)
      this._status = STATUS.FAIL
    }
  }

  private async uploadFile() {
    const task = new Task(
      {
        index: 0,
        start: 0,
        end: this.file.size,
        uploadedSize: this.file.size,
        chunk: this.file
      },
      this.updateProgress
    )
    this.tasks.push(task)
    return await task.execute()
  }
  private updateProgress = (id: string, progressInfo: ProgressInfo) => {
    Object.assign(this._progressInfo, progressInfo)
    console.log('进度更新', this._progressInfo)
  }
  pause() {
    const [task] = this.tasks
    task.pause()
  }

  cancel() {
    const [task] = this.tasks
    task.cancel()
    this.tasks = []
  }

  get progressInfo() {
    console.log('进度更新get progressInfo', this._progressInfo)
    return this._progressInfo
  }

  get status() {
    return this._status
  }
}

// export class BigFileUploader implements Uploader {
//     private _progressInfo = {...progressDefault};
//     private _status = STATUS.PENDING;
//     public tasks: UploadTask[] = [];
//     constructor(
//         public file: File
//     ) {

//     }
//     // 这里可以实现大文件的分片上传逻辑
//     async start() {

//     }
//     createChunk(file, index, chunkSize){
//         return new Promise((resolve, reject)=>{
//             const start = index * chunkSize;
//             const end = Math.min(start + chunkSize, file.size);
//             const blob = file.slice(start, end);
//             const fileRederInstance = new FileReader();
//             fileRederInstance.addEventListener('load', (e) => {
//                 const fileBolb = e.target.result;
//                 const fileMD5 = md5(fileBolb);
//                 resolve({
//                     start,
//                     end,
//                     index,
//                     hash:fileMD5,
//                     file:blob,
//                 })
//             });
//             fileRederInstance.readAsBinaryString(blob);
//         })
//     }
//     async cutFile(callBack){
//         const chunkCount = this._task.totalTasks;
//         for (let i = 0; i < chunkCount; i++) {
//             try {
//                 const chunk = await this.createChunk(this.file, i, this.chunkSize);
//                 callBack(createFormData(chunk),i);
//             } catch (error) {
//                 console.error("Error creating chunk:", error);
//             }
//         }
//     }
//     private updateProgress = (id:string, progressInfo:ProgressInfo) => {

//     }
//     pause() {
//         // 暂停上传实现
//     }

//     cancel(){

//     }

//     get progressInfo() {
//         return this._progressInfo;
//     }

//     get status() {
//         return this._status;
//     }
// }

export function createFileUploader(file: File) {
  const config = useConfig()
  if (file.size > config.maxSize) {
    return new SimpleFileUploader(file)
  } else {
    return new SimpleFileUploader(file)
  }
}
