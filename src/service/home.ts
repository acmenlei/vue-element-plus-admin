import { get, post } from "./config"
// 测试数据
export const queryUserListAction = (data?: any) => get("/comments?postId=1", data)

// export const CSRFAtackTest = (data?: any) => get("/login", data)

// export const queryCookieTest = () => get("/user")

export const uploadSingleFile = (data?: any) => post("/upload", data)
export const uploadBase64File = (data?: any) => post("/upload_base64", data)
