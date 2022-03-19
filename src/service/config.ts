import axios from "axios"

import { errorNotification } from "@/common/message"
import { Tip, Title } from "@/common/tip"
import { hideLoading, showLoading } from "@/common/loading"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 5000,
  withCredentials: true
})
// 请求拦截 统一配置
service.interceptors.request.use(config => {
  showLoading()
  config.headers = config.headers || {}
  if (config.url == "/upload") {
    config.headers["Content-Type"] = 'multiparty/form-data'
  }
  console.log(config.headers)
  return config
}, err => {
  hideLoading()
  return Promise.reject(new Error(err))
})
// 统一在此处解构一层data
service.interceptors.response.use(data => {
  return data.data;
}, err => {
  hideLoading()
  return Promise.reject(new Error(err))
})

// get method
export function get(url: string, params: any = {}) {
  return new Promise((resolved, rejected) => {
    service.get(url, params)
      .then(resp => {
        if (resp.status == 200 || resp.status == 304) {
          resolved(resp)
        }
      }, err => {
        errorNotification(Title.NETWORK_ERROR, Tip.NETWORK_ERROR)
        rejected(err)
      })
      .catch(err => {
        // 弹出错误提示
        rejected(err)
        errorNotification(Title.NETWORK_ERROR, Tip.NETWORK_ERROR)
      })
      .finally(() => hideLoading())
  })
}
// post method
export function post(url: string, data: any = {}) {
  return new Promise((resolved, rejected) => {
    service.post(url, data)
      .then(resp => {
        resolved(resp)
      }, err => {
        errorNotification(Title.NETWORK_ERROR, Tip.NETWORK_ERROR)
        rejected(err)
      })
      .catch(err => {
        // 弹出错误提示
        errorNotification(Title.NETWORK_ERROR, Tip.NETWORK_ERROR)
        rejected(err)
      })
      .finally(() => hideLoading())
  })
}