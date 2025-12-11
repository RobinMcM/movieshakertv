<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <div class="w-full">
    <video 
      :src="url" 
      controls 
      class="w-full rounded-lg border border-gray-700"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</template>

