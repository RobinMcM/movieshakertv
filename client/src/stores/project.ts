import { defineStore } from 'pinia'

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
      trailer: null as string | null
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
    }
  },
  getters: {
    hasPitchDeck: (state) => state.currentProject.pitchDeck !== null
  }
})

