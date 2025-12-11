<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useProjectStore } from '../stores/project'
import PitchDeckViewer from '../components/PitchDeckViewer.vue'
import { ArrowLeft, FileText, Video, Calendar, Users, MapPin, UserCheck, DollarSign } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const projectId = computed(() => parseInt(route.params.id as string, 10))
const project = computed(() => projectStore.getProjectById(projectId.value))

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-cinema-black">
    <div class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <button 
        @click="handleBack"
        class="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      <div v-if="project">
        <!-- Project Header -->
        <div class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h1 class="text-4xl font-bold mb-4">{{ project.title }}</h1>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span class="text-gray-400">Writer:</span>
              <span class="text-white ml-2">{{ project.writer || 'Not specified' }}</span>
            </div>
            <div>
              <span class="text-gray-400">Budget:</span>
              <span class="text-white ml-2">{{ project.budget || 'Not specified' }}</span>
            </div>
            <div>
              <span class="text-gray-400">Date:</span>
              <span class="text-white ml-2">{{ project.date || 'Not specified' }}</span>
            </div>
          </div>
        </div>

        <!-- Elevator Pitch -->
        <div v-if="project.elevatorPitch" class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText class="text-red-500 w-6 h-6" />
            Elevator Pitch
          </h2>
          <p class="text-gray-300 leading-relaxed">{{ project.elevatorPitch }}</p>
        </div>

        <!-- Pitch Deck -->
        <div class="mb-6">
          <PitchDeckViewer :url="project.pitchDeck ?? undefined" />
        </div>

        <!-- Additional Materials -->
        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div v-if="project.script" class="bg-cinema-gray p-4 rounded-lg border border-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <FileText class="text-blue-500 w-5 h-5" />
              <h3 class="font-semibold">Script</h3>
            </div>
            <p class="text-sm text-gray-400">Available</p>
          </div>
          <div v-if="project.treatment" class="bg-cinema-gray p-4 rounded-lg border border-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <FileText class="text-purple-500 w-5 h-5" />
              <h3 class="font-semibold">Treatment</h3>
            </div>
            <p class="text-sm text-gray-400">Available</p>
          </div>
          <div v-if="project.trailer" class="bg-cinema-gray p-4 rounded-lg border border-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <Video class="text-red-500 w-5 h-5" />
              <h3 class="font-semibold">Trailer</h3>
            </div>
            <p class="text-sm text-gray-400">Available</p>
          </div>
        </div>

        <!-- Timeline Summary -->
        <div v-if="project.timelineEvents.length > 0" class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar class="text-red-500 w-6 h-6" />
            Timeline Events
          </h2>
          <div class="space-y-2">
            <div 
              v-for="event in project.timelineEvents" 
              :key="event.id"
              class="text-sm text-gray-300"
            >
              <span class="font-semibold">{{ event.date }}:</span>
              <span class="ml-2">{{ event.title }}</span>
              <span v-if="event.comments" class="ml-2 text-gray-400">- {{ event.comments }}</span>
            </div>
          </div>
        </div>

        <!-- Actors Summary -->
        <div v-if="project.actors.length > 0" class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users class="text-red-500 w-6 h-6" />
            Proposed Actors
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="actor in project.actors" 
              :key="actor.id"
              class="border-l-2 border-red-500 pl-4"
            >
              <h3 class="font-semibold">{{ actor.characterName }}</h3>
              <p class="text-sm text-gray-400">{{ actor.actorName }}</p>
              <p v-if="actor.description" class="text-sm text-gray-300 mt-1">{{ actor.description }}</p>
            </div>
          </div>
        </div>

        <!-- Locations Summary -->
        <div v-if="project.locations.length > 0" class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapPin class="text-red-500 w-6 h-6" />
            Proposed Locations
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="location in project.locations" 
              :key="location.id"
              class="border-l-2 border-red-500 pl-4"
            >
              <h3 class="font-semibold">{{ location.name }}</h3>
              <p class="text-sm text-gray-400">{{ location.address }}</p>
              <p v-if="location.description" class="text-sm text-gray-300 mt-1">{{ location.description }}</p>
            </div>
          </div>
        </div>

        <!-- Team Summary -->
        <div v-if="project.teamMembers.length > 0" class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <UserCheck class="text-red-500 w-6 h-6" />
            Proposed Team
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="member in project.teamMembers" 
              :key="member.id"
              class="border-l-2 border-red-500 pl-4"
            >
              <h3 class="font-semibold">{{ member.name }}</h3>
              <p class="text-sm text-gray-400">{{ member.role }}</p>
              <p v-if="member.description" class="text-sm text-gray-300 mt-1">{{ member.description }}</p>
            </div>
          </div>
        </div>

        <!-- Sponsors Summary -->
        <div v-if="project.sponsors.length > 0" class="bg-cinema-gray p-6 rounded-lg border border-gray-800 mb-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <DollarSign class="text-red-500 w-6 h-6" />
            Sponsors
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="sponsor in project.sponsors" 
              :key="sponsor.id"
              class="border-l-2 border-red-500 pl-4"
            >
              <h3 class="font-semibold">{{ sponsor.name }}</h3>
              <p class="text-sm text-gray-400">{{ sponsor.company }} - {{ sponsor.amount }}</p>
              <p v-if="sponsor.description" class="text-sm text-gray-300 mt-1">{{ sponsor.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-cinema-gray p-6 rounded-lg border border-gray-800 text-center">
        <p class="text-gray-400">Project not found</p>
        <button 
          @click="handleBack"
          class="mt-4 text-red-500 hover:text-red-400"
        >
          Return to Home
        </button>
      </div>
    </div>
  </div>
</template>

