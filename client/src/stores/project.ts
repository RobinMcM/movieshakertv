import { defineStore } from 'pinia'

export interface TimelineEvent {
  id: number
  date: string
  title: string
  comments: string
  duration?: number
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
      timelineEvents: [] as TimelineEvent[]
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
    }
  },
  getters: {
    hasPitchDeck: (state) => state.currentProject.pitchDeck !== null
  }
})

