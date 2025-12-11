<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  saved: [type: string, text: string]
}>()

const text = ref(props.modelValue || '')

watch(() => props.modelValue, (newVal) => {
  text.value = newVal || ''
})

const handleSave = () => {
  emit('update:modelValue', text.value)
  emit('saved', props.type, text.value)
}
</script>

<template>
  <div class="space-y-3">
    <textarea
      v-model="text"
      :placeholder="placeholder || 'Enter text here...'"
      class="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-red-500 min-h-32"
      @blur="handleSave"
    />
    <button
      @click="handleSave"
      class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition text-sm"
    >
      Save
    </button>
  </div>
</template>

