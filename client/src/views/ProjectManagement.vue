<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useProjectStore } from '../stores/project'
import { FileText, Video, File, CheckCircle, X } from 'lucide-vue-next'
import FileUpload from '../components/FileUpload.vue'
import TextUpload from '../components/TextUpload.vue'

const auth = useAuthStore()
const router = useRouter()
const projectStore = useProjectStore()

const project = projectStore.currentProject

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}

const handleFileUploaded = (type: string, url: string) => {
  projectStore.setFile(type as any, url)
}

const handleTextSaved = (type: string, text: string) => {
  if (type === 'elevatorPitch') {
    projectStore.setText('elevatorPitch', text)
  }
}

const removeFile = (type: string) => {
  projectStore.setFile(type as any, null as any)
}
</script>

<template>
  <div class="min-h-screen flex">
    <aside class="w-64 bg-cinema-gray border-r border-gray-800 p-6 flex flex-col">
      <div class="mb-10">
        <h2 class="text-2xl font-bold tracking-tighter">
          Movie<span class="text-red-600">Shaker</span>
        </h2>
      </div>
      
      <nav class="space-y-2 flex-1">
        <RouterLink 
          to="/dashboard" 
          class="block py-2 px-4 rounded hover:bg-gray-800 transition text-gray-300 hover:text-white"
          active-class="bg-gray-800 text-white font-medium"
        >
          Overview
        </RouterLink>
        <RouterLink 
          to="/dashboard/project" 
          class="block py-2 px-4 rounded hover:bg-gray-800 transition text-gray-300 hover:text-white"
          active-class="bg-gray-800 text-white font-medium"
        >
          Project Management
        </RouterLink>
        <div class="block py-2 px-4 rounded text-gray-500 cursor-not-allowed">
          Timeline (Coming Soon)
        </div>
      </nav>
      
      <div class="mt-auto pt-6 border-t border-gray-800">
        <div class="text-sm text-gray-400 mb-4 truncate" v-if="auth.user">
          {{ auth.user.email }}
        </div>
        <button 
          @click="handleLogout" 
          class="w-full text-left py-2 px-4 rounded hover:bg-red-900/20 text-red-400 hover:text-red-300 transition text-sm"
        >
          Sign Out
        </button>
      </div>
    </aside>
    
    <main class="flex-1 bg-cinema-black p-8 overflow-y-auto">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">Project Management</h1>
        <p class="text-gray-400 mb-8">Upload and manage your film pre-production materials</p>
        
        <!-- Project Title -->
        <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <label class="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
          <input 
            :value="project.title"
            @input="(e) => projectStore.updateProject({ title: (e.target as HTMLInputElement).value })"
            type="text"
            class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter project title"
          />
        </div>

        <!-- Upload Sections -->
        <div class="space-y-6">
          <!-- Pitch Deck -->
          <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <FileText class="text-red-500 w-6 h-6" />
                <h3 class="text-xl font-bold">Pitch Deck</h3>
                <CheckCircle v-if="project.pitchDeck" class="text-green-500 w-5 h-5" />
              </div>
              <button 
                v-if="project.pitchDeck"
                @click="removeFile('pitchDeck')"
                class="text-red-400 hover:text-red-300"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <p class="text-gray-400 text-sm mb-4">Upload your project pitch deck (PDF)</p>
            <FileUpload 
              v-if="!project.pitchDeck"
              accept=".pdf"
              type="pitchDeck"
              @uploaded="handleFileUploaded"
            />
            <div v-else class="text-green-400 text-sm flex items-center gap-2">
              <CheckCircle class="w-4 h-4" />
              Pitch deck uploaded
            </div>
          </div>

          <!-- Script -->
          <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <File class="text-blue-500 w-6 h-6" />
                <h3 class="text-xl font-bold">Script</h3>
                <CheckCircle v-if="project.script" class="text-green-500 w-5 h-5" />
              </div>
              <button 
                v-if="project.script"
                @click="removeFile('script')"
                class="text-red-400 hover:text-red-300"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <p class="text-gray-400 text-sm mb-4">Upload your screenplay (PDF or DOCX)</p>
            <FileUpload 
              v-if="!project.script"
              accept=".pdf,.doc,.docx"
              type="script"
              @uploaded="handleFileUploaded"
            />
            <div v-else class="text-green-400 text-sm flex items-center gap-2">
              <CheckCircle class="w-4 h-4" />
              Script uploaded
            </div>
          </div>

          <!-- Elevator Pitch -->
          <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <FileText class="text-yellow-500 w-6 h-6" />
                <h3 class="text-xl font-bold">Elevator Pitch</h3>
                <CheckCircle v-if="project.elevatorPitch" class="text-green-500 w-5 h-5" />
              </div>
            </div>
            <p class="text-gray-400 text-sm mb-4">Write a brief elevator pitch for your film</p>
            <TextUpload 
              v-model="project.elevatorPitch"
              type="elevatorPitch"
              placeholder="Enter your elevator pitch here..."
              @saved="handleTextSaved"
            />
          </div>

          <!-- Short Treatment -->
          <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <FileText class="text-purple-500 w-6 h-6" />
                <h3 class="text-xl font-bold">Short Treatment</h3>
                <CheckCircle v-if="project.treatment" class="text-green-500 w-5 h-5" />
              </div>
              <button 
                v-if="project.treatment"
                @click="removeFile('treatment')"
                class="text-red-400 hover:text-red-300"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <p class="text-gray-400 text-sm mb-4">Upload your short treatment (PDF or text file)</p>
            <FileUpload 
              v-if="!project.treatment"
              accept=".pdf,.txt,.doc,.docx"
              type="treatment"
              @uploaded="handleFileUploaded"
            />
            <div v-else class="text-green-400 text-sm flex items-center gap-2">
              <CheckCircle class="w-4 h-4" />
              Treatment uploaded
            </div>
          </div>

          <!-- Trailer -->
          <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <Video class="text-red-500 w-6 h-6" />
                <h3 class="text-xl font-bold">Trailer</h3>
                <CheckCircle v-if="project.trailer" class="text-green-500 w-5 h-5" />
              </div>
              <button 
                v-if="project.trailer"
                @click="removeFile('trailer')"
                class="text-red-400 hover:text-red-300"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <p class="text-gray-400 text-sm mb-4">Upload your film trailer (MP4, MOV, etc.)</p>
            <FileUpload 
              v-if="!project.trailer"
              accept=".mp4,.mov,.avi,.webm"
              type="trailer"
              @uploaded="handleFileUploaded"
            />
            <div v-else class="text-green-400 text-sm flex items-center gap-2">
              <CheckCircle class="w-4 h-4" />
              Trailer uploaded
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

