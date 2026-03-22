<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePermissionsStore } from '@/stores/permissions'
import logo from '@/assets/nfu-csie-project.png'

const router = useRouter()
const auth = useAuthStore()
const permissions = usePermissionsStore()

const canSearch = () => permissions.can('student', 'search')
const canRegister = () => permissions.can('student', 'register')

const searchKeyword = ref('')
const searchResults = ref<{ id: string; title: string; year: string }[]>([])
const isSearching = ref(false)

function onSearch() {
  if (!searchKeyword.value.trim()) return
  isSearching.value = true
  setTimeout(() => {
    searchResults.value = [
      { id: '1', title: '範例專題 A', year: '113' },
      { id: '2', title: '範例專題 B', year: '112' },
      { id: '3', title: '範例專題 C', year: '111' }
    ]
    isSearching.value = false
  }, 500)
}

function onRegister() {
  alert('登記功能即將開放')
}
</script>

<template>
  <div class="page">
    <header class="top">
      <router-link to="/" class="logo-wrap">
        <img class="logo" :src="logo" alt="NFU CSIE Project Section" />
      </router-link>
      <div class="user-info" v-if="auth.account">
        <span>{{ auth.account }}</span>
        <button class="logout-btn" @click="auth.logout(); router.push('/')">登出</button>
      </div>
    </header>

    <main class="main">
      <h1 class="page-title">學生專題管理</h1>

      <p v-if="!canSearch() && !canRegister()" class="no-permission">您目前沒有可用的功能權限，請聯絡管理員。</p>
      <div v-else class="features">
        <section v-if="canSearch()" class="feature-card">
          <h2 class="feature-title">搜尋</h2>
          <p class="feature-desc">搜尋歷屆或相關專題</p>
          <div class="search-box">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="輸入關鍵字搜尋專題..."
              @keyup.enter="onSearch"
            />
            <button class="search-btn" :disabled="isSearching" @click="onSearch">
              {{ isSearching ? '搜尋中...' : '搜尋' }}
            </button>
          </div>
          <div v-if="searchResults.length" class="search-results">
            <div
              v-for="item in searchResults"
              :key="item.id"
              class="result-item"
            >
              <span class="result-title">{{ item.title }}</span>
              <span class="result-year">{{ item.year }} 學年度</span>
            </div>
          </div>
        </section>

        <section v-if="canRegister()" class="feature-card">
          <h2 class="feature-title">登記</h2>
          <p class="feature-desc">登記專題組別</p>
          <button class="register-btn" @click="onRegister">登記專題</button>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f2f4f8;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: #fff;
  border-bottom: 1px solid #eaeaea;
}

.logo-wrap {
  text-decoration: none;
}

.logo {
  max-width: 400px;
  width: 100%;
  height: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #555;
}

.logout-btn {
  padding: 6px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

.logout-btn:hover {
  background: #f5f5f5;
}

.main {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
}

.no-permission {
  margin: 24px 0;
  padding: 20px;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  color: #92400e;
  font-size: 14px;
}

.page-title {
  margin: 0 0 32px;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
}

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.feature-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.feature-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.feature-desc {
  margin: 0 0 20px;
  font-size: 14px;
  color: #64748b;
}

.search-box {
  display: flex;
  gap: 10px;
}

.search-box input {
  flex: 1;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
}

.search-box input:focus {
  border-color: #2b6ef2;
}

.search-btn {
  height: 42px;
  padding: 0 20px;
  border: none;
  border-radius: 10px;
  background: #2b6ef2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.search-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.search-results {
  margin-top: 16px;
  border-top: 1px solid #eee;
  padding-top: 12px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.result-item:last-child {
  border-bottom: none;
}

.result-title {
  color: #333;
}

.result-year {
  color: #64748b;
  font-size: 13px;
}

.register-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: #2b6ef2;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.register-btn:hover {
  background: #2563eb;
}

@media (max-width: 640px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>