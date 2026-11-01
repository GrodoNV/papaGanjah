export type NavItem = {
  id: string
  label: string
  href: string
}

export type LegalDocument = {
  id: string
  title: string
  agency: string
  date: string
  reference: string
  category: 'Convenio' | 'Oficio' | 'Reconocimiento' | 'Acta'
  description: string
  file: string
  signatories: string
}

export type ImpactMetric = {
  value: string
  label: string
  detail: string
  icon: 'trees' | 'users' | 'recycle' | 'handshake'
}

export type ImpactProject = {
  id: string
  title: string
  location: string
  year: string
  summary: string
  beforeImage: string
  afterImage: string
  tags: string[]
  stats: { label: string; value: string }[]
}

export type CommunityEntry = {
  id: string
  title: string
  location: string
  date: string
  image: string
  summary: string
  stat: string
  tags: string[]
}

export type EventItem = {
  id: string
  title: string
  type: 'Gratuito' | 'De costo'
  price?: string
  date: string
  time: string
  location: string
  city: string
  capacity: number
  registered: number
  description: string
  tag: string
  registrationEmail: string
}

export type BookFormat = {
  id: 'digital' | 'fisica'
  name: string
  price: string
  description: string
  perks: string[]
  highlighted?: boolean
}

export type Book = {
  title: string
  subtitle: string
  author: string
  pages: number
  edition: string
  synopsis: string
  highlights: string[]
  formats: BookFormat[]
  previewFile: string
  previewPages: number
}

export type LegalText = {
  title: string
  updatedAt: string
  intro: string
  sections: { heading: string; body: string[] }[]
}
