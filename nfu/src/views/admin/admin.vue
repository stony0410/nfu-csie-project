<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePermissionsStore } from '@/stores/permissions'
import type { Role, Feature } from '@/stores/permissions'
import logo from '@/assets/nfu-csie-project.png'

const router = useRouter()
const auth = useAuthStore()
const permissions = usePermissionsStore()

const roles: { id: Role; label: string }[] = [
  { id: 'student', label: '學生' },
  { id: 'teacher', label: '教師' }
]

const features: { id: Feature; label: string }[] = [
  { id: 'search', label: '搜尋專題' },
  { id: 'register', label: '登記專題' }
]

function togglePermission(role: Role, feature: Feature) {
  const current = permissions.matrix[role][feature]
  permissions.setPermission(role, feature, !current)
}

function onReset() {
  permissions.resetToDefault()
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
      <h1 class="page-title">權限管理</h1>
      <p class="page-desc">設定各角色可使用哪些功能</p>

      <div class="perm-card">
        <div class="perm-header">
          <h2>功能權限</h2>
          <button class="reset-btn" @click="onReset">還原預設</button>
        </div>

        <table class="perm-table">
          <thead>
            <tr>
              <th class="corner">功能 \ 角色</th>
              <th v-for="r in roles" :key="r.id">{{ r.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in features" :key="f.id">
              <td class="feature-name">{{ f.label }}</td>
              <td v-for="r in roles" :key="r.id">
                <label class="toggle-wrap">
                  <input
                    type="checkbox"
                    :checked="permissions.matrix[r.id][f.id]"
                    @change="togglePermission(r.id, f.id)"
                  />
                  <span class="toggle-label">{{ permissions.matrix[r.id][f.id] ? '開啟' : '關閉' }}</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
}

.page-desc {
  margin: 0 0 24px;
  font-size: 14px;
  color: #64748b;
}

.perm-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.perm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.perm-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.reset-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.reset-btn:hover {
  background: #f5f5f5;
}

.perm-table {
  width: 100%;
  border-collapse: collapse;
}

.perm-table th,
.perm-table td {
  padding: 14px 16px;
  border: 1px solid #eee;
  text-align: center;
}

.perm-table th {
  background: #f8fafc;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.perm-table td {
  font-size: 14px;
}

.corner {
  text-align: left;
  min-width: 120px;
}

.feature-name {
  text-align: left;
  font-weight: 500;
  color: #334155;
}

.toggle-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}

.toggle-wrap input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.toggle-label {
  font-size: 13px;
  color: #64748b;
}
</style>
