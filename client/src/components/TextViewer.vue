<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
    <div class="prose prose-invert max-w-none">
      <p class="text-gray-300 whitespace-pre-wrap leading-relaxed">{{ text }}</p>
    </div>
  </div>
</template>

