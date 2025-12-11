import { defineStore } from 'pinia'

export interface TimelineEvent {
  id: number
  date: string
  title: string
  comments: string
  duration?: number
}

export interface Actor {
  id: number
  characterName: string
  actorName: string
  description: string
}

export interface Location {
  id: number
  name: string
  address: string
  description: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  description: string
}

interface Project {
  id: number
  title: string
  writer: string
  budget: string
  date: string
  pitchDeck: string | null
  script: string | null
  elevatorPitch: string
  treatment: string | null
  trailer: string | null
  timelineEvents: TimelineEvent[]
  actors: Actor[]
  locations: Location[]
  teamMembers: TeamMember[]
}

export const useProjectStore = defineStore('project', {
  state: () => ({
    // Mock project data - will be replaced with API calls later
    currentProject: {
      id: 1,
      title: 'Untitled Film Project',
      writer: '',
      budget: '',
      date: '',
      pitchDeck: null as string | null,
      script: null as string | null,
      elevatorPitch: '',
      treatment: null as string | null,
      trailer: null as string | null,
      timelineEvents: [] as TimelineEvent[],
      actors: [] as Actor[],
      locations: [] as Location[],
      teamMembers: [] as TeamMember[]
    } as Project
  }),
  actions: {
    updateProject(updates: Partial<Project>) {
      this.currentProject = { ...this.currentProject, ...updates }
    },
    setFile(type: keyof Project, url: string) {
      if (type === 'pitchDeck' || type === 'script' || type === 'treatment' || type === 'trailer') {
        this.currentProject[type] = url
      }
    },
    setText(type: 'elevatorPitch', text: string) {
      this.currentProject[type] = text
    },
    addTimelineEvent(event: Omit<TimelineEvent, 'id'>) {
      const newId = Math.max(0, ...this.currentProject.timelineEvents.map(e => e.id)) + 1
      this.currentProject.timelineEvents.push({ ...event, id: newId })
    },
    updateTimelineEvent(id: number, updates: Partial<TimelineEvent>) {
      const index = this.currentProject.timelineEvents.findIndex(e => e.id === id)
      if (index !== -1) {
        this.currentProject.timelineEvents[index] = { ...this.currentProject.timelineEvents[index], ...updates }
      }
    },
    deleteTimelineEvent(id: number) {
      this.currentProject.timelineEvents = this.currentProject.timelineEvents.filter(e => e.id !== id)
    },
    addActor(actor: Omit<Actor, 'id'>) {
      const newId = Math.max(0, ...this.currentProject.actors.map(a => a.id)) + 1
      this.currentProject.actors.push({ ...actor, id: newId })
    },
    updateActor(id: number, updates: Partial<Actor>) {
      const index = this.currentProject.actors.findIndex(a => a.id === id)
      if (index !== -1) {
        this.currentProject.actors[index] = { ...this.currentProject.actors[index], ...updates }
      }
    },
    deleteActor(id: number) {
      this.currentProject.actors = this.currentProject.actors.filter(a => a.id !== id)
    },
    addLocation(location: Omit<Location, 'id'>) {
      const newId = Math.max(0, ...this.currentProject.locations.map(l => l.id)) + 1
      this.currentProject.locations.push({ ...location, id: newId })
    },
    updateLocation(id: number, updates: Partial<Location>) {
      const index = this.currentProject.locations.findIndex(l => l.id === id)
      if (index !== -1) {
        this.currentProject.locations[index] = { ...this.currentProject.locations[index], ...updates }
      }
    },
    deleteLocation(id: number) {
      this.currentProject.locations = this.currentProject.locations.filter(l => l.id !== id)
    },
    addTeamMember(member: Omit<TeamMember, 'id'>) {
      const newId = Math.max(0, ...this.currentProject.teamMembers.map(m => m.id)) + 1
      this.currentProject.teamMembers.push({ ...member, id: newId })
    },
    updateTeamMember(id: number, updates: Partial<TeamMember>) {
      const index = this.currentProject.teamMembers.findIndex(m => m.id === id)
      if (index !== -1) {
        this.currentProject.teamMembers[index] = { ...this.currentProject.teamMembers[index], ...updates }
      }
    },
    deleteTeamMember(id: number) {
      this.currentProject.teamMembers = this.currentProject.teamMembers.filter(m => m.id !== id)
    }
  },
  getters: {
    hasPitchDeck: (state) => state.currentProject.pitchDeck !== null
  }
})

