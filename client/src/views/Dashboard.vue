<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { Plus } from 'lucide-vue-next'

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
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <RouterLink 
          to="/dashboard/project"
          class="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition shadow-lg shadow-red-900/20"
        >
          <Plus class="w-5 h-5" />
          New Project
        </RouterLink>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
          <h3 class="text-lg font-bold mb-2">My Projects</h3>
          <p class="text-gray-400 text-sm mb-4">No active projects assigned.</p>
          <RouterLink 
            to="/dashboard/project"
            class="inline-block text-red-500 hover:text-red-400 text-sm font-medium"
          >
            Create your first project →
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

