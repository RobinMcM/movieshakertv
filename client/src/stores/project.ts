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

export interface Sponsor {
  id: number
  name: string
  company: string
  amount: string
  description: string
}

export interface Project {
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
  published: boolean
  timelineEvents: TimelineEvent[]
  actors: Actor[]
  locations: Location[]
  teamMembers: TeamMember[]
  sponsors: Sponsor[]
}

export const useProjectStore = defineStore('project', {
  state: () => ({
    // All projects - will be replaced with API calls later
    projects: [
      {
        id: 1,
        title: 'The Midnight Runner',
        writer: 'Jane Smith',
        budget: '$2.5M',
        date: '2024-06-15',
        pitchDeck: null as string | null,
        script: null as string | null,
        elevatorPitch: 'A thrilling chase through the neon-lit streets of Tokyo as a courier races against time to deliver a package that could change everything.',
        treatment: null as string | null,
        trailer: null as string | null,
        published: true,
        timelineEvents: [] as TimelineEvent[],
        actors: [] as Actor[],
        locations: [] as Location[],
        teamMembers: [] as TeamMember[],
        sponsors: [] as Sponsor[]
      },
      {
        id: 2,
        title: 'Echoes of Tomorrow',
        writer: 'Michael Chen',
        budget: '$5M',
        date: '2024-08-20',
        pitchDeck: null as string | null,
        script: null as string | null,
        elevatorPitch: 'A sci-fi drama exploring the consequences of time travel when a scientist discovers messages from her future self.',
        treatment: null as string | null,
        trailer: null as string | null,
        published: true,
        timelineEvents: [] as TimelineEvent[],
        actors: [] as Actor[],
        locations: [] as Location[],
        teamMembers: [] as TeamMember[],
        sponsors: [] as Sponsor[]
      },
      {
        id: 3,
        title: 'Desert Dreams',
        writer: 'Sarah Johnson',
        budget: '$1.8M',
        date: '2024-09-10',
        pitchDeck: null as string | null,
        script: null as string | null,
        elevatorPitch: 'A coming-of-age story about a young artist who finds inspiration in the vast landscapes of the American Southwest.',
        treatment: null as string | null,
        trailer: null as string | null,
        published: false,
        timelineEvents: [] as TimelineEvent[],
        actors: [] as Actor[],
        locations: [] as Location[],
        teamMembers: [] as TeamMember[],
        sponsors: [] as Sponsor[]
      }
    ] as Project[],
    // Current project being edited (for ProjectManagement page)
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
      published: false,
      timelineEvents: [] as TimelineEvent[],
      actors: [] as Actor[],
      locations: [] as Location[],
      teamMembers: [] as TeamMember[],
      sponsors: [] as Sponsor[]
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
        const existing = this.currentProject.timelineEvents[index]!
        this.currentProject.timelineEvents[index] = { 
          id: existing.id,
          date: updates.date ?? existing.date,
          title: updates.title ?? existing.title,
          comments: updates.comments ?? existing.comments,
          duration: updates.duration ?? existing.duration
        }
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
        const existing = this.currentProject.actors[index]!
        this.currentProject.actors[index] = {
          id: existing.id,
          characterName: updates.characterName ?? existing.characterName,
          actorName: updates.actorName ?? existing.actorName,
          description: updates.description ?? existing.description
        }
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
        const existing = this.currentProject.locations[index]!
        this.currentProject.locations[index] = {
          id: existing.id,
          name: updates.name ?? existing.name,
          address: updates.address ?? existing.address,
          description: updates.description ?? existing.description
        }
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
        const existing = this.currentProject.teamMembers[index]!
        this.currentProject.teamMembers[index] = {
          id: existing.id,
          name: updates.name ?? existing.name,
          role: updates.role ?? existing.role,
          description: updates.description ?? existing.description
        }
      }
    },
    deleteTeamMember(id: number) {
      this.currentProject.teamMembers = this.currentProject.teamMembers.filter(m => m.id !== id)
    },
    addSponsor(sponsor: Omit<Sponsor, 'id'>) {
      const newId = Math.max(0, ...this.currentProject.sponsors.map(s => s.id)) + 1
      this.currentProject.sponsors.push({ ...sponsor, id: newId })
    },
    updateSponsor(id: number, updates: Partial<Sponsor>) {
      const index = this.currentProject.sponsors.findIndex(s => s.id === id)
      if (index !== -1) {
        const existing = this.currentProject.sponsors[index]!
        this.currentProject.sponsors[index] = {
          id: existing.id,
          name: updates.name ?? existing.name,
          company: updates.company ?? existing.company,
          amount: updates.amount ?? existing.amount,
          description: updates.description ?? existing.description
        }
      }
    },
    deleteSponsor(id: number) {
      this.currentProject.sponsors = this.currentProject.sponsors.filter(s => s.id !== id)
    },
    // New actions for multiple projects
    getPublishedProjects(): Project[] {
      return this.projects.filter(p => p.published)
    },
    getProjectById(id: number): Project | undefined {
      return this.projects.find(p => p.id === id)
    },
    setProjectPublished(id: number, published: boolean) {
      const project = this.projects.find(p => p.id === id)
      if (project) {
        project.published = published
      }
    }
  },
  getters: {
    hasPitchDeck: (state) => state.currentProject.pitchDeck !== null,
    publishedProjects: (state) => state.projects.filter(p => p.published)
  }
})

