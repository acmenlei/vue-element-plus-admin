import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/es/components/loading/src/loading"

let loadingInstance1: LoadingInstance

export function showLoading() {
  loadingInstance1 = ElLoading.service({ fullscreen: true, background: "rgba(0,0,0, .6)" })
}

export function hideLoading() {
  loadingInstance1.close()
}