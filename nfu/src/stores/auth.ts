import { defineStore } from 'pinia'

export type Role = 'student' | 'teacher' | 'admin'

type AuthState = {
  isAuthed: boolean
  role: Role | null
  account: string | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthed: false,
    role: null,
    account: null,
    token: null
  }),

  actions: {
    setAuth(data: { token: string; role: Role; account: string }) {
      this.isAuthed = true
      this.token = data.token
      this.role = data.role
      this.account = data.account
    },
    logout() {
      this.isAuthed = false
      this.token = null
      this.role = null
      this.account = null
    }
  }
})