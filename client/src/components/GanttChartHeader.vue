<script setup lang="ts">
import { computed } from 'vue'

interface TimelineEvent {
  id: number
  date: string
  title: string
  comments: string
  duration?: number
}

const props = defineProps<{
  events: TimelineEvent[]
  selectedDate?: string
}>()

const emit = defineEmits<{
  dateSelected: [date: string]
}>()

// Calculate date range from events
const dateRange = computed(() => {
  if (props.events.length === 0) {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 3, 0)
    return { start, end }
  }
  
  const dates = props.events.map(e => new Date(e.date)).sort((a, b) => a.getTime() - b.getTime())
  const startDate = dates[0]
  const endDate = dates[dates.length - 1]
  
  if (!startDate || !endDate) {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 3, 0)
    return { start, end }
  }
  
  // Add padding
  const start = new Date(startDate)
  const end = new Date(endDate)
  start.setMonth(start.getMonth() - 1)
  end.setMonth(end.getMonth() + 1)
  
  return { start, end }
})

const months = computed((): Date[] => {
  const monthsList: Date[] = []
  const range = dateRange.value
  if (!range.start || !range.end) return monthsList
  
  const start = new Date(range.start)
  const end = new Date(range.end)
  
  let current = new Date(start.getFullYear(), start.getMonth(), 1)
  while (current <= end) {
    monthsList.push(new Date(current))
    current.setMonth(current.getMonth() + 1)
  }
  
  return monthsList
})

const daysInRange = computed((): Date[] => {
  const days: Date[] = []
  const range = dateRange.value
  if (!range.start || !range.end) return days
  
  const start = new Date(range.start)
  const end = new Date(range.end)
  
  let current = new Date(start)
  while (current <= end) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  
  return days
})

const handleDateClick = (date: Date) => {
  const dateStr = date.toISOString().split('T')[0]
  if (dateStr) {
    emit('dateSelected', dateStr)
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const hasEvent = (date: Date) => {
  const dateStr = date.toISOString().split('T')[0]
  return props.events.some(e => e.date === dateStr)
}
</script>

<template>
  <div class="bg-cinema-gray rounded-lg border border-gray-800 overflow-hidden">
    <div class="p-4 border-b border-gray-700">
      <h3 class="text-lg font-bold text-white mb-2">Timeline Overview</h3>
      <div class="text-sm text-gray-400">
        {{ months.length }} months • {{ daysInRange.length }} days
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <div class="min-w-full" style="min-width: 800px;">
        <!-- Month Headers -->
        <div class="flex border-b border-gray-700">
          <div v-for="month in months" :key="month.getTime()" 
            class="flex-1 min-w-0 border-r border-gray-700 last:border-r-0 p-2 text-center">
            <div class="text-sm font-semibold text-white">
              {{ month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
            </div>
          </div>
        </div>
        
        <!-- Timeline Bar -->
        <div class="relative h-16 bg-gray-900">
          <!-- Week markers -->
          <div class="absolute inset-0 flex">
            <div v-for="day in daysInRange" 
              :key="day.getTime()"
              :class="[
                'border-r border-gray-700 flex-1 cursor-pointer hover:bg-gray-800 transition',
                isToday(day) ? 'bg-red-900/30 border-red-500' : '',
                hasEvent(day) ? 'bg-blue-900/20' : ''
              ]"
              :title="formatDate(day)"
              @click="handleDateClick(day)"
            >
              <div v-if="day.getDate() === 1" class="text-xs text-gray-500 p-1">
                {{ day.getDate() }}
              </div>
            </div>
          </div>
          
          <!-- Event markers -->
          <div class="absolute inset-0">
            <div v-for="event in events" 
              :key="event.id"
              :style="{
                left: dateRange.start && dateRange.end 
                  ? `${((new Date(event.date).getTime() - dateRange.start.getTime()) / (dateRange.end.getTime() - dateRange.start.getTime())) * 100}%`
                  : '0%'
              }"
              class="absolute top-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white transform -translate-x-1/2 cursor-pointer hover:scale-125 transition"
              :title="`${event.title} - ${formatDate(new Date(event.date))}`"
            />
          </div>
          
          <!-- Today indicator -->
          <div v-if="daysInRange.some(isToday) && dateRange.start && dateRange.end"
            :style="{
              left: `${((new Date().getTime() - dateRange.start.getTime()) / (dateRange.end.getTime() - dateRange.start.getTime())) * 100}%`
            }"
            class="absolute top-0 bottom-0 w-0.5 bg-red-500 transform -translate-x-1/2 z-10"
          >
            <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-red-500 font-bold">
              Today
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

