import { singleton } from '@/utils/singleton'
import { TaskQueue } from '@/utils/LinkedList'

type Task = () => Promise<any>

type TaskItem = {
  task: Task
  resolve: (value: any) => any
  reject: (value: any) => any
}

export type TaskItemList = TaskQueue<TaskItem>

// 并发池
export class ConcurrentPool {
  parallelCount: number
  maxRetries: number
  tasks: TaskItemList
  runningCount: number
  constructor(parallelCount = 2, maxRetries = 3) {
    this.parallelCount = parallelCount
    this.maxRetries = maxRetries
    this.tasks = new TaskQueue()
    this.runningCount = 0
  }
  // 加入
  add(id: string, task: Task) {
    return new Promise((resolve, reject) => {
      this.tasks.enqueue(id, {
        task,
        resolve,
        reject
      })
      this._run()
    })
  }
  // 删除
  remove(id: string) {
    this.tasks.remove(id)
    console.log('remove', id, this.tasks.queue)
  }
  // 重试
  retryTask(currentTask: TaskItem, maxRetries: number) {
    const { task, resolve, reject } = currentTask
    return task()
      .then(resolve)
      .catch((err) => {
        console.error(err)
        if (maxRetries > 0 && err.code !== 'ERR_CANCELED') {
          this.retryTask(currentTask, maxRetries - 1)
        } else {
          return reject(err)
        }
      })
      .finally(() => {
        this.runningCount--
        this._run()
      })
  }
  execute(currentTask: TaskItem) {
    const { task, resolve, reject } = currentTask
    return task()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.runningCount--
        this._run()
      })
  }
  _run() {
    while (this.runningCount < this.parallelCount && this.tasks.size > 0) {
      console.log('runningCount', this.runningCount, this.parallelCount)
      const task = this.tasks.dequeue() as TaskItem
      this.runningCount++
      this.execute(task)
    }
  }
}

export const pool = singleton(ConcurrentPool)
