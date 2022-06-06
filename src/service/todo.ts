import { errorNotification, successNotification } from "@/common/message"
import { NetWorkTips, OperatorTips } from "@/common/tip"

const REQUEST_URL = "https://getpantry.cloud/apiv1/pantry/50d468e6-7cc6-4960-839d-3f5ebf478688/basket/users"

export function query() {
  return new Promise((resolve) => {
    fetch(REQUEST_URL).then(resp => resp.json().then(rest => {
      resolve(rest)
    }))
      .catch(reason => errorNotification('网络提示', NetWorkTips.NETWORK_ERROR))
  })
}

export function update(data: any) {
  return new Promise((resolve) => {
    let headers = new Headers()
    headers.append("Content-Type", "application/json")
    fetch(REQUEST_URL, { method: "POST", body: JSON.stringify(data), headers })
      .then(resp => resp.json().then(rest => {
        resolve(rest)
        successNotification('提示', OperatorTips.SUCCESS)
      }))
      .catch(reason => errorNotification('网络提示', NetWorkTips.NETWORK_ERROR))
  })
}


