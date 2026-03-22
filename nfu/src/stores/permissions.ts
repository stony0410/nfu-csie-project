import { defineStore } from 'pinia'

export type Role = 'student' | 'teacher'
export type Feature = 'search' | 'register'

type PermissionMatrix = Record<Role, Record<Feature, boolean>>

const defaultPermissions: PermissionMatrix = {
  student: { search: true, register: true },
  teacher: { search: true, register: true }
}

export const usePermissionsStore = defineStore('permissions', {
  state: () => ({
    matrix: { ...defaultPermissions } as PermissionMatrix
  }),

  getters: {
    can: (state) => (role: Role, feature: Feature) =>
      state.matrix[role]?.[feature] ?? false
  },

  actions: {
    setPermission(role: Role, feature: Feature, enabled: boolean) {
      if (this.matrix[role]) {
        this.matrix[role][feature] = enabled
      }
    },
    resetToDefault() {
      this.matrix = JSON.parse(JSON.stringify(defaultPermissions))
    }
  }
})
