export interface HCP {
    id: string
    name: string
    title: string
    institution: string
    avatar: string
    about: string
    stats: {
      connections: number
      publications: number
    }
    education: {
      institution: string
      degree: string
      year: string
    }[]
    experience: {
      position: string
      institution: string
      duration: string
    }[]
    specializations: string[]
  }
  
  export interface Connection {
    source: string
    target: string
    type: string
    description: string
    strength: number
  }
  
  export interface NetworkData {
    nodes: HCP[]
    links: Connection[]
  }
  