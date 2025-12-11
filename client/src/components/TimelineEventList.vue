<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Edit2, Trash2, Calendar } from 'lucide-vue-next'

interface TimelineEvent {
  id: number
  date: string
  title: string
  comments: string
  duration?: number
}

const props = defineProps<{
  events: TimelineEvent[]
}>()

const emit = defineEmits<{
  add: [event: Omit<TimelineEvent, 'id'>]
  update: [id: number, event: Partial<TimelineEvent>]
  delete: [id: number]
}>()

const showAddForm = ref(false)
const editingId = ref<number | null>(null)

const formData = ref({
  date: '',
  title: '',
  comments: ''
})

const sortedEvents = computed(() => {
  return [...props.events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})

const openAddForm = () => {
  formData.value = { date: '', title: '', comments: '' }
  showAddForm.value = true
  editingId.value = null
}

const openEditForm = (event: TimelineEvent) => {
  formData.value = {
    date: event.date,
    title: event.title,
    comments: event.comments
  }
  editingId.value = event.id
  showAddForm.value = true
}

const closeForm = () => {
  showAddForm.value = false
  editingId.value = null
  formData.value = { date: '', title: '', comments: '' }
}

const handleSubmit = () => {
  if (!formData.value.date || !formData.value.title) {
    return
  }
  
  if (editingId.value !== null) {
    emit('update', editingId.value, formData.value)
  } else {
    emit('add', formData.value)
  }
  
  closeForm()
}

const handleDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this event?')) {
    emit('delete', id)
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>

<template>
  <div class="space-y-4">
    <!-- Add Event Button -->
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-white">Timeline Events</h3>
      <button
        @click="openAddForm"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        <Plus class="w-4 h-4" />
        Add Event
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm" class="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h4 class="text-white font-semibold mb-4">
        {{ editingId !== null ? 'Edit Event' : 'Add New Event' }}
      </h4>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Date</label>
          <input
            v-model="formData.date"
            type="date"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            v-model="formData.title"
            type="text"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Event title"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Comments</label>
          <textarea
            v-model="formData.comments"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500 min-h-24"
            placeholder="Add comments or description..."
          />
        </div>
        <div class="flex gap-2">
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            {{ editingId !== null ? 'Update' : 'Add' }} Event
          </button>
          <button
            @click="closeForm"
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Events List -->
    <div class="space-y-3">
      <div
        v-for="event in sortedEvents"
        :key="event.id"
        class="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <Calendar class="w-4 h-4 text-red-500" />
              <span class="text-sm text-gray-400">{{ formatDate(event.date) }}</span>
            </div>
            <h4 class="text-white font-semibold mb-2">{{ event.title }}</h4>
            <p v-if="event.comments" class="text-gray-300 text-sm whitespace-pre-wrap">
              {{ event.comments }}
            </p>
          </div>
          <div class="flex gap-2 ml-4">
            <button
              @click="openEditForm(event)"
              class="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition"
              title="Edit"
            >
              <Edit2 class="w-4 h-4" />
            </button>
            <button
              @click="handleDelete(event.id)"
              class="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition"
              title="Delete"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="sortedEvents.length === 0" class="text-center py-12 text-gray-500">
        <Calendar class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No timeline events yet.</p>
        <p class="text-sm mt-2">Click "Add Event" to create your first timeline entry.</p>
      </div>
    </div>
  </div>
</template>

