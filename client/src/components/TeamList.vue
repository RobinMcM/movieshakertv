<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit2, Trash2, UserCheck } from 'lucide-vue-next'

interface TeamMember {
  id: number
  name: string
  role: string
  description: string
}

const props = defineProps<{
  teamMembers: TeamMember[]
}>()

const emit = defineEmits<{
  add: [member: Omit<TeamMember, 'id'>]
  update: [id: number, member: Partial<TeamMember>]
  delete: [id: number]
}>()

const showAddForm = ref(false)
const editingId = ref<number | null>(null)

const formData = ref({
  name: '',
  role: '',
  description: ''
})

const openAddForm = () => {
  formData.value = { name: '', role: '', description: '' }
  showAddForm.value = true
  editingId.value = null
}

const openEditForm = (member: TeamMember) => {
  formData.value = {
    name: member.name,
    role: member.role,
    description: member.description
  }
  editingId.value = member.id
  showAddForm.value = true
}

const closeForm = () => {
  showAddForm.value = false
  editingId.value = null
  formData.value = { name: '', role: '', description: '' }
}

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.role) {
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
  if (confirm('Are you sure you want to delete this team member?')) {
    emit('delete', id)
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Add Team Member Button -->
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-white">Proposed Team</h3>
      <button
        @click="openAddForm"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        <Plus class="w-4 h-4" />
        Add Team Member
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm" class="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h4 class="text-white font-semibold mb-4">
        {{ editingId !== null ? 'Edit Team Member' : 'Add New Team Member' }}
      </h4>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Name *</label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter team member name"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Role *</label>
          <input
            v-model="formData.role"
            type="text"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="e.g., Director, Producer, Cinematographer"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500 min-h-24"
            placeholder="Add description or notes about this team member..."
          />
        </div>
        <div class="flex gap-2">
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            {{ editingId !== null ? 'Update' : 'Add' }} Team Member
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

    <!-- Team Members List -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="member in teamMembers"
        :key="member.id"
        class="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <UserCheck class="w-5 h-5 text-red-500" />
            <h4 class="text-white font-semibold">{{ member.name }}</h4>
          </div>
          <div class="flex gap-2">
            <button
              @click="openEditForm(member)"
              class="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition"
              title="Edit"
            >
              <Edit2 class="w-4 h-4" />
            </button>
            <button
              @click="handleDelete(member.id)"
              class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition"
              title="Delete"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-xs text-gray-400">Role:</span>
            <p class="text-gray-300 text-sm">{{ member.role }}</p>
          </div>
          <div v-if="member.description">
            <span class="text-xs text-gray-400">Description:</span>
            <p class="text-gray-300 text-sm whitespace-pre-wrap">{{ member.description }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="teamMembers.length === 0" class="col-span-full text-center py-12 text-gray-500">
        <UserCheck class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No team members added yet.</p>
        <p class="text-sm mt-2">Click "Add Team Member" to add your first team member.</p>
      </div>
    </div>
  </div>
</template>

