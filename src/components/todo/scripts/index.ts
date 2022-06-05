import { ref } from "vue"
import { query, update } from "@/service/todo"
import { getCookie } from "@/common/cookie";
import { USERNAME, useUserStore } from "@/store/modules/user";

// tasks item type...
export interface TodoItem {
  status: string;
  name: string;
}

export function useTodo() {
  let tasks = ref<TodoItem[]>([])
  let task = ref<string>("")
  let currentIdx = ref<number>(-1)
  // get
  async function queryTodo() {
    const data: any = await query();
    // query user todo list
    const userStore = useUserStore();
    userStore.updateUsers(data.users);

    const username = getCookie(USERNAME)
    for (let user of data.users) {
      if (username == user.username) {
        tasks.value = user.tasks;
        break;
      }
    }
  }
  // update
  async function submitTodo() {
    if (currentIdx.value == -1) {
      // add
      tasks.value.push({ status: 'to-do', name: task.value })
    } else {
      // edit
      tasks.value[currentIdx.value].name = task.value;
      currentIdx.value = -1;
    }
    // rest
    task.value = "";
    updateTodo_helper()
  }
  // status change
  async function changeTodo(idx: number) {
    switch (tasks.value[idx].status) {
      case "finished": tasks.value[idx].status = "in-progress"; break;
      case "to-do": tasks.value[idx].status = "finished"; break;
      case "in-progress": tasks.value[idx].status = "to-do"; break;
      default: break;
    }
    // update remote list
    updateTodo_helper()
  }
  // del
  async function deleteTodo(idx: number) {
    tasks.value.splice(idx, 1);
    updateTodo_helper()
  }
  // edit
  function editTodo(idx: number) {
    task.value = tasks.value[idx].name;
    currentIdx.value = idx;
  }
  
  // 统一更新函数
  async function updateTodo_helper() {
    let userStore = useUserStore();
    const users = userStore.users
    for (let i = users.length - 1; i >= 0; i--) {
      // 找当前用户的tasks
      if (users[i].username == userStore.username) {
        users[i].tasks = tasks.value;
        break;
      }
    }
    await update({ users });
  }

  return {
    queryTodo, submitTodo, changeTodo, deleteTodo, editTodo, tasks, task
  }
}