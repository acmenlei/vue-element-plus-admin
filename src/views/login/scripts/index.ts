import { ref, onMounted, reactive } from 'vue'
import { useRouter } from "vue-router"

import { queryUserList, registerUser } from "@/service/user"
import { useUserStore } from '@/store/modules/user';
import { successNotification, errorNotification } from '@/common/message';
import { LoginTips, NetWorkTips, RegisterTips } from '@/common/tip';

const container = ref<HTMLElement>()
const signInButton = ref<HTMLElement>()
const signUpButton = ref<HTMLElement>()
const router = useRouter()

onMounted(() => {
  signUpButton.value?.addEventListener('click', () => container.value?.classList.add('right-panel-active'));
  signInButton.value?.addEventListener('click', () => container.value?.classList.remove('right-panel-active'));
})

// user login hook
export function useLogin() {
  let loginForm = reactive({
    username: "",
    password: ""
  })
  async function login() {
    try {
      let data: any = await queryUserList()
      // 标记是否找到用户
      let flag = "";
      for (let { username, password } of data.users) {
        if (username == loginForm.username) {
          flag = password;
          break;
        }
      }
      if (flag) {
        // 有这个用户 那么判断他的密码
        let rest: boolean = flag == loginForm.password
        // 密码正确
        if (rest) {
          let userStore = useUserStore()
          userStore.login(loginForm.username, data.users);
          router.replace('/home')
          successNotification("登陆结果提示", LoginTips.SUCCESS)
        } else {
          errorNotification("登陆结果提示", LoginTips.REASON)
        }
      } else {
        errorNotification("登陆结果提示", LoginTips.NOT_EXIST_USER)
      }
    } catch {
      errorNotification("网络提示", NetWorkTips.NETWORK_ERROR)
    }
    loginForm.username = "";
    loginForm.password = "";
  }
  return {
    loginForm, login
  }
}

// user register hook
export function useRegister() {
  let registerForm = reactive({
    username: "",
    password: ""
  })
  async function register() {
    let userStore = useUserStore()
    for (let { username } of userStore.users) {
      if (username == registerForm.username) {
        errorNotification('注册提示', RegisterTips.HAS_EXIST_USER)
        return;
      }
    }
    userStore.users.push({ username: registerForm.username, password: registerForm.password, tasks: [] })
    await registerUser({ users: userStore.users })
    successNotification("注册提示", RegisterTips.SUCCESS)
    signInButton.value?.click()
    registerForm.username = ""
    registerForm.password = ""
  }
  return {
    registerForm, register
  }
}