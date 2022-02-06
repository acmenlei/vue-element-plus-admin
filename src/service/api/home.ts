import { get } from "../config"
// 测试数据
export const queryUserListAction = (data?: any) => get("/comments?postId=1", data)