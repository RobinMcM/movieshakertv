<script setup lang="ts">
import { ref } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

defineProps<{
  url?: string
}>()

const page = ref(1)
const pageCount = ref(0)

const handleLoaded = (pdf: any) => {
    pageCount.value = pdf.numPages
}
</script>

<template>
  <div class="flex flex-col items-center bg-cinema-gray p-6 rounded-lg border border-gray-800">
    <h3 class="text-2xl font-bold mb-6 text-white tracking-wide">Project Pitch Deck</h3>
    
    <div v-if="url" class="w-full max-w-4xl border border-gray-700 shadow-2xl">
      <VuePdfEmbed :source="url" :page="page" @loaded="handleLoaded" />
      
      <div class="mt-4 flex gap-4 justify-center items-center">
        <button 
          :disabled="page <= 1" 
          @click="page--"
          class="px-4 py-2 bg-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition"
        >
          Prev
        </button>
        <span class="text-gray-400">Page {{ page }}<span v-if="pageCount > 0"> of {{ pageCount }}</span></span>
        <button 
          :disabled="pageCount > 0 && page >= pageCount" 
          @click="page++"
          class="px-4 py-2 bg-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition"
        >
          Next
        </button>
      </div>
    </div>
    
    <div v-else class="h-96 w-full flex items-center justify-center bg-gray-900 text-gray-500 border border-dashed border-gray-700 rounded">
      No Pitch Deck Uploaded
    </div>
  </div>
</template>

