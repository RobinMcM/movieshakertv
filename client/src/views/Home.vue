<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import PitchDeckThumbnail from '../components/PitchDeckThumbnail.vue'
import { Clapperboard, FileText, Lightbulb } from 'lucide-vue-next'
import { useProjectStore } from '../stores/project'

const projectStore = useProjectStore()
const publishedProjects = computed(() => projectStore.getPublishedProjects())
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <nav class="flex justify-between items-center mb-16">
      <div class="flex items-center gap-2">
        <Clapperboard class="text-red-600 w-8 h-8" />
        <h1 class="text-3xl font-bold tracking-tighter">
          Movie<span class="text-red-600">Shaker</span>.TV
        </h1>
      </div>
      <RouterLink 
        to="/login" 
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition shadow-lg shadow-red-900/20"
      >
        Login
      </RouterLink>
    </nav>

    <section class="text-center mb-24 space-y-6">
      <h2 class="text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight">
        Organize Your <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
          Film Production
        </span>
      </h2>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto font-light">
        The central command center for your next masterpiece. Manage timelines, scripts, and creative concepts in one secure place.
      </p>
    </section>

    <section class="mb-24">
      <h2 class="text-3xl font-bold mb-8 text-center">Published Pitch Decks</h2>
      <div v-if="publishedProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink
          v-for="project in publishedProjects"
          :key="project.id"
          :to="`/pitch/${project.id}`"
          class="bg-cinema-gray rounded-lg border border-gray-800 overflow-hidden hover:border-red-500 transition duration-300 hover:shadow-lg hover:shadow-red-900/20 group"
        >
          <PitchDeckThumbnail :url="project.pitchDeck" :title="project.title" />
          <div class="p-4">
            <h3 class="text-xl font-bold text-white group-hover:text-red-500 transition">
              {{ project.title }}
            </h3>
            <p v-if="project.writer" class="text-sm text-gray-400 mt-1">
              by {{ project.writer }}
            </p>
          </div>
        </RouterLink>
      </div>
      <div v-else class="text-center text-gray-500 py-12 bg-cinema-gray rounded-lg border border-gray-800">
        <p class="mb-4">No published pitch decks available yet.</p>
        <RouterLink 
          to="/login" 
          class="text-red-500 hover:text-red-400 underline inline-block"
        >
          Login to upload
        </RouterLink>
      </div>
    </section>

    <section class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="bg-cinema-gray p-8 rounded-xl border border-gray-800 hover:border-red-900/50 transition duration-300 group">
        <div class="bg-red-900/20 p-4 rounded-full w-fit mb-6 group-hover:bg-red-600/20 transition">
          <Clapperboard class="text-red-500 w-8 h-8" />
        </div>
        <h3 class="text-2xl font-bold mb-3">Timelines</h3>
        <p class="text-gray-400 leading-relaxed">
          Keep your production on track. visualize shoot days, deadlines, and milestones with our intuitive scheduling tools.
        </p>
      </div>
      
      <div class="bg-cinema-gray p-8 rounded-xl border border-gray-800 hover:border-red-900/50 transition duration-300 group">
        <div class="bg-blue-900/20 p-4 rounded-full w-fit mb-6 group-hover:bg-blue-600/20 transition">
          <FileText class="text-blue-500 w-8 h-8" />
        </div>
        <h3 class="text-2xl font-bold mb-3">Documents</h3>
        <p class="text-gray-400 leading-relaxed">
          Securely share scripts, call sheets, and budgets. Role-based access ensures sensitive info stays private.
        </p>
      </div>
      
      <div class="bg-cinema-gray p-8 rounded-xl border border-gray-800 hover:border-red-900/50 transition duration-300 group">
        <div class="bg-yellow-900/20 p-4 rounded-full w-fit mb-6 group-hover:bg-yellow-600/20 transition">
          <Lightbulb class="text-yellow-500 w-8 h-8" />
        </div>
        <h3 class="text-2xl font-bold mb-3">Idea Board</h3>
        <p class="text-gray-400 leading-relaxed">
          Brainstorm scenes, share mood boards, and collaborate on creative concepts in real-time.
        </p>
      </div>
    </section>
    
    <footer class="text-center text-gray-600 py-12 border-t border-gray-900">
      &copy; 2024 MovieShaker.TV. All rights reserved.
    </footer>
  </div>
</template>

