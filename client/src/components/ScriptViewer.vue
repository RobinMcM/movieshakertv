<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { ref } from 'vue'

defineProps<{
  url: string
}>()

const page = ref(1)
const pageCount = ref(0)

const handleLoaded = (pdf: any) => {
  pageCount.value = pdf.numPages
}
</script>

<template>
  <div class="w-full border border-gray-700 shadow-2xl bg-white">
    <VuePdfEmbed :source="url" :page="page" @loaded="handleLoaded" />
    <div class="mt-4 flex gap-4 justify-center items-center bg-gray-100 p-2">
      <button 
        :disabled="page <= 1" 
        @click="page--"
        class="px-4 py-2 bg-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition text-white"
      >
        Prev
      </button>
      <span class="text-gray-700">Page {{ page }}<span v-if="pageCount > 0"> of {{ pageCount }}</span></span>
      <button 
        :disabled="pageCount > 0 && page >= pageCount" 
        @click="page++"
        class="px-4 py-2 bg-red-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition text-white"
      >
        Next
      </button>
    </div>
  </div>
</template>

