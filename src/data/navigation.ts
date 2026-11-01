import type { NavItem } from '@/types'

export const navigation: NavItem[] = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
  { id: 'transparencia', label: 'Transparencia', href: '#transparencia' },
  { id: 'impacto', label: 'Impacto', href: '#impacto' },
  { id: 'libro', label: 'Libro', href: '#libro' },
  { id: 'eventos', label: 'Eventos', href: '#eventos' },
  { id: 'donar', label: 'Donar', href: '#donar' },
]

export const site = {
  name: 'Papá Ganjah',
  slogan: 'El cannabis es una opción',
  description:
    'Colectivo ciudadano pro-cannabis legal. Colaboramos con autoridades en salud, educación e impacto comunitario.',
  email: 'contacto@papaganjah.org',
  eventsEmail: 'eventos@papaganjah.org',
  city: 'Ciudad de México, México',
  founded: 2019,
  social: {
    instagram: 'https://instagram.com/papaganjah',
    facebook: 'https://facebook.com/papaganjah',
  },
}
