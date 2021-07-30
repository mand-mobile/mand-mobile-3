import {Worker} from 'worker_threads'

const noop = () => {}
export function createWorker (script: string, data, listeners: any = {}) {
  const worker = new Worker(script, {
    workerData: JSON.stringify(data || {})
  })

  const _on = worker.on
  // @ts-ignore
  worker.on = function (event, listener) {
    if (event === 'error') {
      process.on('uncaughtException', listener)
      process.on('unhandledRejection', listener)
    }
    _on.call(worker, event, listener)
  }
  return worker
}