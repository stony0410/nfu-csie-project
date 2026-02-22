<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiLogin } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/nfu-csie-project.png'

const router = useRouter()
const auth = useAuthStore()

const account = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function onLogin() {
  error.value = ''

  // 帳號必須為數字
  if (!/^\d+$/.test(account.value)) {
    error.value = '帳號只能輸入數字'
    return
  }

  // 密碼不能空
  if (!password.value) {
    error.value = '請輸入密碼'
    return
  }

  loading.value = true

  try {
    // 🔥 呼叫後端 API
    const data = await apiLogin(account.value, password.value)

    // 🔥 存登入狀態
    auth.setAuth(data)

    // 🔥 依後端回傳角色導頁
    router.push(`/${data.role}`)
  } catch (err: any) {
    error.value = err?.message || '登入失敗'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <!-- 上方：Logo + 標題 -->
    <router-link to="/" class="top">
      <img class="logo" :src="logo" alt="NFU CSIE Project Section" />
    </router-link>

    
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

/* 你圖那種上方白底橫幅 */
.top {
  display: flex;
  justify-content: center;
  padding: 18px 12px;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  text-decoration: none;
}

.logo {
  max-width: 700px;
  width: 100%;
  height: auto;
}

/* 中間登入框 */
.center {
  display: grid;
  place-items: center;
  padding: 36px 12px;
}

.card {
  width: 360px;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.title {
  margin: 0 0 12px;
  font-size: 18px;
}

.field {
  display: grid;
  gap: 6px;
  margin-top: 12px;
}

label {
  font-size: 13px;
  color: #444;
}

input {
  height: 40px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
}

input:focus {
  border-color: #2b6ef2;
}

.error {
  margin: 10px 0 0;
  color: #d93025;
  font-size: 13px;
}

.btn {
  margin-top: 14px;
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: #2b6ef2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>