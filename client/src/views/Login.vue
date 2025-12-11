<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import { API_URL } from '../config'

const email = ref('')
const password = ref('')
const isRegister = ref(false)
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  try {
    const endpoint = isRegister.value ? '/api/register' : '/api/login'
    const res = await axios.post(`${API_URL}${endpoint}`, {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
    
    authStore.login(res.data.user)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'An error occurred'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cinema-black">
    <div class="bg-cinema-gray p-8 rounded-lg w-full max-w-md border border-gray-800">
      <h2 class="text-3xl font-bold mb-6 text-center text-red-500">
        {{ isRegister ? 'Join Crew' : 'Crew Login' }}
      </h2>
      
      <div v-if="error" class="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-sm">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block mb-1 text-gray-300">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            required 
          />
        </div>
        <div>
          <label class="block mb-1 text-gray-300">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            required 
          />
        </div>
        <button type="submit" class="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-bold transition">
          {{ isRegister ? 'Register' : 'Login' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <button 
          @click="isRegister = !isRegister" 
          class="text-gray-400 hover:text-white text-sm"
        >
          {{ isRegister ? 'Already have an account? Login' : 'Need an account? Register' }}
        </button>
      </div>
    </div>
  </div>
</template>

