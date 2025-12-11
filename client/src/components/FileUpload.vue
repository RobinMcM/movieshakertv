<script setup lang="ts">
import { ref } from 'vue'
import { Upload } from 'lucide-vue-next'

const props = defineProps<{
  accept: string
  type: string
}>()

const emit = defineEmits<{
  uploaded: [type: string, url: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)

const handleFileSelect = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  isUploading.value = true

  // Simulate file upload - in production this will upload to Digital Ocean Spaces
  // For now, create a mock URL
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const mockUrl = URL.createObjectURL(file)
  emit('uploaded', props.type, mockUrl)
  
  isUploading.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      @change="handleFileChange"
      class="hidden"
    />
    <button
      @click="handleFileSelect"
      :disabled="isUploading"
      class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition"
    >
      <Upload class="w-4 h-4" />
      <span>{{ isUploading ? 'Uploading...' : 'Choose File' }}</span>
    </button>
  </div>
</template>

