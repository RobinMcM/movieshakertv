import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '../config'

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
        const res = await axios.get(`${API_URL}/api/me`, { withCredentials: true })
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
        await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true })
        this.user = null
    }
  }
})

