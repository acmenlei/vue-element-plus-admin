// inject keys
import { InjectionKey, Ref } from "vue";

// 响应式依赖注入
export const MESSAGE = Symbol() as InjectionKey<Ref<string>>