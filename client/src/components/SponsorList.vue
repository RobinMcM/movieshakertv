<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit2, Trash2, DollarSign } from 'lucide-vue-next'

interface Sponsor {
  id: number
  name: string
  company: string
  amount: string
  description: string
}

const props = defineProps<{
  sponsors: Sponsor[]
}>()

const emit = defineEmits<{
  add: [sponsor: Omit<Sponsor, 'id'>]
  update: [id: number, sponsor: Partial<Sponsor>]
  delete: [id: number]
}>()

const showAddForm = ref(false)
const editingId = ref<number | null>(null)

const formData = ref({
  name: '',
  company: '',
  amount: '',
  description: ''
})

const openAddForm = () => {
  formData.value = { name: '', company: '', amount: '', description: '' }
  showAddForm.value = true
  editingId.value = null
}

const openEditForm = (sponsor: Sponsor) => {
  formData.value = {
    name: sponsor.name,
    company: sponsor.company,
    amount: sponsor.amount,
    description: sponsor.description
  }
  editingId.value = sponsor.id
  showAddForm.value = true
}

const closeForm = () => {
  showAddForm.value = false
  editingId.value = null
  formData.value = { name: '', company: '', amount: '', description: '' }
}

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.company || !formData.value.amount) {
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
  if (confirm('Are you sure you want to delete this sponsor?')) {
    emit('delete', id)
  }
}

const formatAmount = (amount: string) => {
  if (!amount) return ''
  const num = parseFloat(amount)
  if (isNaN(num)) return amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Add Sponsor Button -->
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold text-white">Sponsors</h3>
      <button
        @click="openAddForm"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
      >
        <Plus class="w-4 h-4" />
        Add Sponsor
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showAddForm" class="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h4 class="text-white font-semibold mb-4">
        {{ editingId !== null ? 'Edit Sponsor' : 'Add New Sponsor' }}
      </h4>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Name *</label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter sponsor name"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Company *</label>
          <input
            v-model="formData.company"
            type="text"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter company name"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Amount *</label>
          <input
            v-model="formData.amount"
            type="text"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter amount (e.g., 50000)"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            class="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500 min-h-24"
            placeholder="Add description or notes about this sponsor..."
          />
        </div>
        <div class="flex gap-2">
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            {{ editingId !== null ? 'Update' : 'Add' }} Sponsor
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

    <!-- Sponsors List -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        class="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <DollarSign class="w-5 h-5 text-red-500" />
            <h4 class="text-white font-semibold">{{ sponsor.name }}</h4>
          </div>
          <div class="flex gap-2">
            <button
              @click="openEditForm(sponsor)"
              class="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition"
              title="Edit"
            >
              <Edit2 class="w-4 h-4" />
            </button>
            <button
              @click="handleDelete(sponsor.id)"
              class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition"
              title="Delete"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <span class="text-xs text-gray-400">Company:</span>
            <p class="text-gray-300 text-sm">{{ sponsor.company }}</p>
          </div>
          <div>
            <span class="text-xs text-gray-400">Amount:</span>
            <p class="text-green-400 text-sm font-semibold">{{ formatAmount(sponsor.amount) }}</p>
          </div>
          <div v-if="sponsor.description">
            <span class="text-xs text-gray-400">Description:</span>
            <p class="text-gray-300 text-sm whitespace-pre-wrap">{{ sponsor.description }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="sponsors.length === 0" class="col-span-full text-center py-12 text-gray-500">
        <DollarSign class="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No sponsors added yet.</p>
        <p class="text-sm mt-2">Click "Add Sponsor" to add your first sponsor.</p>
      </div>
    </div>
  </div>
</template>

