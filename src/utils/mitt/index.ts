import mitt from "mitt";

const instance = mitt()

// 监听事件
export function acceptMittEvent(eventName: string, cb: any) {
  instance.on(eventName, cb)
}
// 发射事件
export function emitMittEvent(eventName: string, ...args: any[]) {
  instance.emit(eventName, args)
}
// 移除事件
export function removeMittEvent(eventName: string) {
  instance.off(eventName)
}