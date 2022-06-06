<script setup lang='ts'>
import { useLogin, useRegister } from "./scripts"

const { login, loginForm } = useLogin()
const { register, registerForm } = useRegister()

</script>

<template>
  <p class="form-title">&lt;&lt;登陆查看我的待办集&gt;&gt;</p>
  <div class='container' ref="container" id='container'>
    <div class="form-container sign-up-container">
      <!-- 注册 -->
      <form action="javascript:;">
        <h1>用户注册</h1>
        <input v-model="registerForm.username" type="text" placeholder="用户名">
        <input v-model="registerForm.password" autocomplete="off" type="password" placeholder="密码">
        <button @click="register">注册</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <!-- 登陆 -->
      <form action="javascript:;">
        <h1>用户登陆</h1>
        <input v-model="loginForm.username" type="text" placeholder="用户名">
        <input v-model="loginForm.password" autocomplete="off" type="password" placeholder="密码">
        <button @click="login">登陆</button>
      </form>
    </div>
    <!-- 侧边栏内容 -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有帐号？</h1>
          <p>亲爱的快快点我去进行登陆吧。</p>
          <button class='ghost' ref="signInButton" id="signIn">登陆</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有帐号？</h1>
          <p>点击注册去注册一个属于你的账号吧。</p>
          <button class='ghost' ref="signUpButton" id="signUp">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 0.2rem;
  font-size: 1.2rem;
}

p {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 100;
  margin: 1.2rem 0;
  letter-spacing: 0.1rem;
}

span {
  font-size: 0.8rem;
  margin: 1.2rem 0;
}

a {
  color: #333;
  font-size: 1rem;
  text-decoration: none;
}

.container {
  position: relative;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 10%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  padding: 0.6rem;
  width: 50rem;
  height: 35rem;
  overflow: hidden;
  max-width: 100vw;
  min-height: 70vh;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.form-title {
  text-align: center;
  font-size: 40px;
}

.form-container input {
  width: 100%;
  height: 2.2rem;
  text-indent: 1rem;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  border-top: none;
  outline: none;
  margin: 0.6rem 0;
}

.form-container button:active {
  transform: scale(0.95, 0.95);
}

.form-container button {
  padding: 0.4rem 1rem;
  background: #04AA6D;
  color: white;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  font-size: 0.6rem;
  padding: 0.5rem 0;
}

button.ghost {
  background: transparent;
  border-color: #fff;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  padding: 0.5rem 0;
  color: white;
  font-size: 0.6rem;
}

form button {
  width: 100% !important;
}

button.ghost:active {
  transform: scale(0.95, 0.95);
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.overlay {
  background: #04AA6D;
  width: 200%;
  height: 100%;
  position: relative;
  left: -100%;
  transition: all 0.6s ease-in-out;
  color: white;
}

.overlay-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 99;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 2.2rem;
}

.overlay-right {
  right: 0;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
  transition: all 0.6s ease-in-out;
}
</style>