export enum STATUS {
  FAIL = 'fail',
  PAUSE = 'pause',
  PENDING = 'pending',
  SUCCESS = 'success',
  UPLOADING = 'uploading'
}

export const uploadStatus = {
  [STATUS.FAIL]: {
    text: '上传失败',
    color: 'red'
  },
  [STATUS.PAUSE]: {
    text: '已暂停',
    color: 'orange'
  },
  [STATUS.PENDING]: {
    text: '等待中',
    color: 'blue'
  },
  [STATUS.SUCCESS]: {
    text: '上传成功',
    color: 'green'
  },
  [STATUS.UPLOADING]: {
    text: '上传中',
    color: 'blue'
  }
}

export enum TASK_STATUS {
  FAIL = 'fail',
  PENDING = 'pending',
  WAITING = 'waiting',
  COMPLETED = 'completed'
}

export const progressDefault = {
  total: 0,
  rate: 0,
  progress: 0,
  loaded: 0,
  estimated: 0
}
