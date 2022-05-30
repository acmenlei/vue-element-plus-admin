import { ref } from "vue"
import {
  query, update
} from "@/service/todo"

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
    tasks.value = data.tasks;
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
    await update({ tasks: tasks.value });
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
    await update({ tasks: tasks.value });
  }
  // del
  async function deleteTodo(idx: number) {
    tasks.value.splice(idx, 1);
    await update({ tasks: tasks.value });
  }
  // edit
  function editTodo(idx: number) {
    task.value = tasks.value[idx].name;
    currentIdx.value = idx;
  }

  return {
    queryTodo, submitTodo, changeTodo, deleteTodo, editTodo, tasks, task
  }
}