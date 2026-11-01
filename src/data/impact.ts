import type { CommunityEntry, ImpactMetric, ImpactProject } from '@/types'

export const impactMetrics: ImpactMetric[] = [
  {
    value: '12',
    label: 'Espacios públicos rehabilitados',
    detail: 'Parques, jardines y áreas deportivas recuperadas con vecinos.',
    icon: 'trees',
  },
  {
    value: '1,240',
    label: 'kg de residuos retirados',
    detail: 'Jornadas de limpieza y separación de residuos en espacios públicos.',
    icon: 'recycle',
  },
  {
    value: '480',
    label: 'Voluntarios activos',
    detail: 'Personas que donan su tiempo en talleres y jornadas comunitarias.',
    icon: 'users',
  },
  {
    value: '9',
    label: 'Convenios institucionales',
    detail: 'Acuerdos formales con dependencias de salud, ambiente y cultura.',
    icon: 'handshake',
  },
]

export const featuredProject: ImpactProject = {
  id: 'alameda-norte',
  title: 'Parque Alameda Norte',
  location: 'Ciudad de México',
  year: '2025 — 2026',
  summary:
    'Recuperamos 3,200 m² de área verde con la alcaldía y 120 vecinos. Reparamos bancas, instalamos luminarias, recuperamos el huerto y creamos una señalética educativa sobre uso responsable y reducción de riesgos.',
  beforeImage: '/img/park-before.svg',
  afterImage: '/img/park-after.svg',
  tags: ['Espacio público', 'Participación vecinal', 'Colaboración institucional'],
  stats: [
    { label: 'Área recuperada', value: '3,200 m²' },
    { label: 'Árboles plantados', value: '86' },
    { label: 'Vecinos participantes', value: '120' },
  ],
}

export const communityEntries: CommunityEntry[] = [
  {
    id: 'huerto',
    title: 'Huerto comunitario La Raíz',
    location: 'Iztapalapa, CDMX',
    date: '2026-04-18',
    image: '/img/community-garden.svg',
    summary:
      'Construimos 14 camas de cultivo y un sistema de captación de agua de lluvia. El huerto es cuidado por familias del barrio y abre talleres gratuitos cada sábado.',
    stat: '14 camas de cultivo',
    tags: ['Alimentación', 'Educación ambiental'],
  },
  {
    id: 'taller',
    title: 'Taller de reducción de riesgos',
    location: 'Casa del Colectivo, CDMX',
    date: '2026-05-23',
    image: '/img/workshop.svg',
    summary:
      'Un espacio de conversación sin estigmas con personal de salud, orientado a jóvenes mayores de edad y familias. Participaron 78 personas.',
    stat: '78 asistentes',
    tags: ['Salud', 'Formación'],
  },
  {
    id: 'feria',
    title: 'Feria de derechos y comunidad',
    location: 'Parque Alameda Norte, CDMX',
    date: '2026-07-12',
    image: '/img/community-fair.svg',
    summary:
      'Módulos de orientación legal, salud visual y servicios de la alcaldía. Más de 300 vecinos accedieron a servicios gratuitos en una sola jornada.',
    stat: '300+ vecinos atendidos',
    tags: ['Derechos', 'Servicios'],
  },
]
