<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useProjectStore } from '../stores/project'
import { FileText, Video, File, CheckCircle, X, Calendar, Users, MapPin, UserCheck, DollarSign } from 'lucide-vue-next'
import FileUpload from '../components/FileUpload.vue'
import TextUpload from '../components/TextUpload.vue'
import GanttChartHeader from '../components/GanttChartHeader.vue'
import TimelineEventList from '../components/TimelineEventList.vue'
import ActorList from '../components/ActorList.vue'
import LocationList from '../components/LocationList.vue'
import TeamList from '../components/TeamList.vue'
import SponsorList from '../components/SponsorList.vue'

const auth = useAuthStore()
const router = useRouter()
const projectStore = useProjectStore()

const project = projectStore.currentProject
const activeTab = ref('materials')

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

const handleTimelineEventAdd = (event: Omit<import('../stores/project').TimelineEvent, 'id'>) => {
  projectStore.addTimelineEvent(event)
}

const handleTimelineEventUpdate = (id: number, updates: Partial<import('../stores/project').TimelineEvent>) => {
  projectStore.updateTimelineEvent(id, updates)
}

const handleTimelineEventDelete = (id: number) => {
  projectStore.deleteTimelineEvent(id)
}

const handleDateSelected = (date: string) => {
  // Optional: Could auto-fill date in add form or highlight date
  console.log('Date selected:', date)
}

const handleActorAdd = (actor: Omit<import('../stores/project').Actor, 'id'>) => {
  projectStore.addActor(actor)
}

const handleActorUpdate = (id: number, updates: Partial<import('../stores/project').Actor>) => {
  projectStore.updateActor(id, updates)
}

const handleActorDelete = (id: number) => {
  projectStore.deleteActor(id)
}

const handleLocationAdd = (location: Omit<import('../stores/project').Location, 'id'>) => {
  projectStore.addLocation(location)
}

const handleLocationUpdate = (id: number, updates: Partial<import('../stores/project').Location>) => {
  projectStore.updateLocation(id, updates)
}

const handleLocationDelete = (id: number) => {
  projectStore.deleteLocation(id)
}

const handleTeamMemberAdd = (member: Omit<import('../stores/project').TeamMember, 'id'>) => {
  projectStore.addTeamMember(member)
}

const handleTeamMemberUpdate = (id: number, updates: Partial<import('../stores/project').TeamMember>) => {
  projectStore.updateTeamMember(id, updates)
}

const handleTeamMemberDelete = (id: number) => {
  projectStore.deleteTeamMember(id)
}

const handleSponsorAdd = (sponsor: Omit<import('../stores/project').Sponsor, 'id'>) => {
  projectStore.addSponsor(sponsor)
}

const handleSponsorUpdate = (id: number, updates: Partial<import('../stores/project').Sponsor>) => {
  projectStore.updateSponsor(id, updates)
}

const handleSponsorDelete = (id: number) => {
  projectStore.deleteSponsor(id)
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
        
        <!-- Project Information -->
        <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
              <input 
                :value="project.title"
                @input="(e) => projectStore.updateProject({ title: (e.target as HTMLInputElement).value })"
                type="text"
                class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
                placeholder="Enter project title"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Writer</label>
              <input 
                :value="project.writer"
                @input="(e) => projectStore.updateProject({ writer: (e.target as HTMLInputElement).value })"
                type="text"
                class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
                placeholder="Writer name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Budget</label>
              <input 
                :value="project.budget"
                @input="(e) => projectStore.updateProject({ budget: (e.target as HTMLInputElement).value })"
                type="text"
                class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
                placeholder="Budget amount"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input 
                :value="project.date"
                @input="(e) => projectStore.updateProject({ date: (e.target as HTMLInputElement).value })"
                type="date"
                class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-800 mb-6">
          <nav class="flex space-x-8">
            <button
              @click="activeTab = 'materials'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition',
                activeTab === 'materials'
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <FileText class="w-4 h-4" />
                Project Materials
              </div>
            </button>
            <button
              @click="activeTab = 'timeline'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition',
                activeTab === 'timeline'
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                Proposed Timeline
              </div>
            </button>
            <button
              @click="activeTab = 'actors'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition',
                activeTab === 'actors'
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <Users class="w-4 h-4" />
                Proposed Actors
              </div>
            </button>
            <button
              @click="activeTab = 'locations'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition',
                activeTab === 'locations'
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4" />
                Proposed Locations
              </div>
            </button>
            <button
              @click="activeTab = 'team'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition',
                activeTab === 'team'
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <UserCheck class="w-4 h-4" />
                Proposed Team
              </div>
            </button>
            <button
              @click="activeTab = 'budget'"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition',
                activeTab === 'budget'
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-2">
                <DollarSign class="w-4 h-4" />
                Sponsors
              </div>
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <!-- Tab 1: Project Materials -->
        <div v-show="activeTab === 'materials'">
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

        <!-- Tab 2: Proposed Timeline -->
        <div v-show="activeTab === 'timeline'" class="space-y-6">
          <div>
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar class="text-red-500 w-6 h-6" />
              Proposed Timeline
            </h3>
          </div>
          
          <!-- Gantt Chart Header -->
          <GanttChartHeader 
            :events="project.timelineEvents"
            @date-selected="handleDateSelected"
          />
          
          <!-- Timeline Event List -->
          <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
            <TimelineEventList
              :events="project.timelineEvents"
              @add="handleTimelineEventAdd"
              @update="handleTimelineEventUpdate"
              @delete="handleTimelineEventDelete"
            />
          </div>
        </div>

        <!-- Tab 3: Proposed Actors -->
        <div v-show="activeTab === 'actors'" class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
          <ActorList
            :actors="project.actors"
            @add="handleActorAdd"
            @update="handleActorUpdate"
            @delete="handleActorDelete"
          />
        </div>

        <!-- Tab 4: Proposed Locations -->
        <div v-show="activeTab === 'locations'" class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
          <LocationList
            :locations="project.locations"
            @add="handleLocationAdd"
            @update="handleLocationUpdate"
            @delete="handleLocationDelete"
          />
        </div>

        <!-- Tab 5: Proposed Team -->
        <div v-show="activeTab === 'team'" class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
          <TeamList
            :team-members="project.teamMembers"
            @add="handleTeamMemberAdd"
            @update="handleTeamMemberUpdate"
            @delete="handleTeamMemberDelete"
          />
        </div>

        <!-- Tab 6: Sponsors -->
        <div v-show="activeTab === 'budget'" class="bg-cinema-gray p-6 rounded-lg border border-gray-800">
          <SponsorList
            :sponsors="project.sponsors"
            @add="handleSponsorAdd"
            @update="handleSponsorUpdate"
            @delete="handleSponsorDelete"
          />
        </div>
      </div>
    </main>
  </div>
</template>

