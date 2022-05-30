export function query() {
  return new Promise((resolve) => {
    fetch("https://getpantry.cloud/apiv1/pantry/50d468e6-7cc6-4960-839d-3f5ebf478688/basket/coderlei_todo")
      .then(resp => resp.json().then(rest => {
        resolve(rest)
      }))
  })
}

export function update(data: any) {
  return new Promise((resolve) => {
    let headers = new Headers()
    headers.append("Content-Type", "application/json")
    fetch("https://getpantry.cloud/apiv1/pantry/50d468e6-7cc6-4960-839d-3f5ebf478688/basket/coderlei_todo", { method: "POST", body: JSON.stringify(data), headers })
      .then(resp => resp.json().then(rest => {
        resolve(rest)
      }))
  })
}


