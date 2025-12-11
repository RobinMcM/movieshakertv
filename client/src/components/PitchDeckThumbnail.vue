<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { FileText } from 'lucide-vue-next'

defineProps<{
  url?: string | null
  title?: string
}>()
</script>

<template>
  <div class="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
    <div v-if="url" class="w-full h-full overflow-hidden">
      <div class="scale-[0.25] origin-top-left w-[400%] h-[400%]">
        <VuePdfEmbed 
          :source="url" 
          :page="1"
        />
      </div>
    </div>
    <div v-else class="w-full h-full flex flex-col items-center justify-center text-gray-500">
      <FileText class="w-12 h-12 mb-2 opacity-50" />
      <span class="text-xs">{{ title || 'No Pitch Deck' }}</span>
    </div>
  </div>
</template>

