import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: number
  email: string
  role: 'admin' | 'crew'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    initialized: false
  }),
  actions: {
    async checkAuth() {
      try {
        const res = await axios.get('http://localhost:3000/api/me', { withCredentials: true })
        this.user = res.data.user
      } catch (err) {
        this.user = null
      } finally {
        this.initialized = true
      }
    },
    async login(userData: User) {
      this.user = userData
    },
    async logout() {
        await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true })
        this.user = null
    }
  }
})

