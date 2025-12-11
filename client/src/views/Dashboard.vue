<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex">
    <aside class="w-64 bg-cinema-gray border-r border-gray-800 p-6 flex flex-col">
      <div class="mb-10">
        <h2 class="text-2xl font-bold tracking-tighter">
          Movie<span class="text-red-600">Shaker</span>
        </h2>
      </div>
      
      <nav class="space-y-2 flex-1">
        <RouterLink 
          to="/dashboard" 
          class="block py-2 px-4 rounded hover:bg-gray-800 transition text-gray-300 hover:text-white"
          active-class="bg-gray-800 text-white font-medium"
        >
          Overview
        </RouterLink>
        <div class="block py-2 px-4 rounded text-gray-500 cursor-not-allowed">
          Timeline (Coming Soon)
        </div>
      </nav>
      
      <div class="mt-auto pt-6 border-t border-gray-800">
        <div class="text-sm text-gray-400 mb-4 truncate" v-if="auth.user">
          {{ auth.user.email }}
        </div>
        <button 
          @click="handleLogout" 
          class="w-full text-left py-2 px-4 rounded hover:bg-red-900/20 text-red-400 hover:text-red-300 transition text-sm"
        >
          Sign Out
        </button>
      </div>
    </aside>
    
    <main class="flex-1 bg-cinema-black p-8 overflow-y-auto">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
          <h3 class="text-lg font-bold mb-2">My Projects</h3>
          <p class="text-gray-400 text-sm">No active projects assigned.</p>
        </div>
      </div>
    </main>
  </div>
</template>

