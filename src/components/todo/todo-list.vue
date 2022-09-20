<script setup lang='ts'>
import { useUserStore } from '@/store/modules/user';
import { useTodo } from './scripts'
import { debounce } from "lodash-es"
// use Todo List Logic...
const { tasks, task, queryTodo, submitTodo, changeTodo, deleteTodo, editTodo } = useTodo();
// init tasks data...
debounce(queryTodo, 100)
// logout current account
function logout() {
  useUserStore().logout()
}
</script>

<template>
  <div class="todo-list">
    <!-- Heading -->
    <h2 class="text-center">{{ useUserStore().username }} 's Todo List</h2>
    <!-- Input -->
    <div class="flex-container">
      <input type="text" v-model="task" placeholder="Enter task" />
      <button class="submit-btn" @click="submitTodo">
        SUBMIT
      </button>
    </div>

    <!-- Task table -->
    <table class="tasks">
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Del</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span :class="{ 'line-through': task.status === 'finished' }">
              {{ task.name }}
            </span>
          </td>
          <td>
            <span class="pointer noselect" @click="changeTodo(index)" :class="{
              'text-danger': task.status === 'to-do',
              'text-success': task.status === 'finished',
              'text-warning': task.status === 'in-progress',
            }">
              {{ task.status }}
            </span>
          </td>
          <td class="text-center">
            <div @click="deleteTodo(index)">
              <button class="btn del-btn">del</button>
            </div>
          </td>
          <td class="text-center">
            <div @click="editTodo(index)">
              <button class="btn edit-btn">edit</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="logout">
      <button @click="logout">LOGOUT</button>
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

.flex-container {
  display: flex;
  margin-bottom: .2rem;
}

.flex-container input {
  flex: 1;
  height: 30px;
  font-size: 1.2em;
  outline: none;
  padding: 1rem .5rem;
  border: none;
  border-bottom: 1px solid #ccc;
}

.flex-container .submit-btn {
  background: orange;
  color: white;
  padding: 0 1rem;
  outline: none;
  border: 2px solid orange;
  cursor: pointer;
  border-radius: 2px;
}

.tasks {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.tasks td,
.tasks th {
  border: 1px solid #ddd;
  padding: 8px;
}

.tasks tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tasks th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

.pointer {
  cursor: pointer;
}

.noselect {
  user-select: none;
}

.line-through {
  text-decoration: line-through;
}

.text-danger {
  color: red;
}

.text-warning {
  color: darkorange
}

.text-success {
  color: green;
}
.btn {
  color: white;
  padding: .5rem 1.5rem;
  outline: none;
  cursor: pointer;
  border-radius: 2px;
  border: 0;
}
.del-btn {
  background-color: rgb(251, 95, 39);
}
.edit-btn {
  background-color: #999;
}

.logout button{
  margin-top: 10px;
  width: 100%;
  border: none;
  outline: none;
  padding: 5px;
  background: gray;
  color: white;
  transition: .2s;
  cursor: pointer;
}
.logout button:hover {
  transform: scale(1, 1.05);
}
</style>