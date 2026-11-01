import type { LegalDocument } from '@/types'

export const documents: LegalDocument[] = [
  {
    id: 'convenio-alameda',
    title: 'Convenio de colaboración para la rehabilitación del Parque Alameda Norte',
    agency: 'Secretaría de Medio Ambiente y Desarrollo Sustentable',
    date: '2025-08-14',
    reference: 'SEMADS/DG/2025-0142',
    category: 'Convenio',
    description:
      'Acuerdo de coordinación para la recuperación de áreas verdes, mobiliario urbano y señalética comunitaria en la Alameda Norte.',
    file: '/docs/convenio-parque-alameda.pdf',
    signatories: 'Dirección General de Vinculación Ciudadana y Papá Ganjah A.C.',
  },
  {
    id: 'oficio-foro-salud',
    title: 'Oficio de autorización para el Foro de Salud y Regulación Responsable',
    agency: 'Secretaría de Salud — Dirección de Promoción de la Salud',
    date: '2025-10-02',
    reference: 'SS/DPRS/2025-0781',
    category: 'Oficio',
    description:
      'Autorización para realizar actividades de divulgación, orientación y reducción de riesgos en un marco de salud pública.',
    file: '/docs/permiso-foro-salud.pdf',
    signatories: 'Dirección de Promoción de la Salud',
  },
  {
    id: 'reconocimiento-congreso',
    title: 'Reconocimiento por participación en el Congreso de Política de Drogas',
    agency: 'Congreso de la Ciudad de México — Comisión de Salud',
    date: '2026-03-19',
    reference: 'CCDMX/CS/2026-0119',
    category: 'Reconocimiento',
    description:
      'Constancia de participación como colectivo de la sociedad civil en las mesas de trabajo sobre política de drogas y derechos humanos.',
    file: '/docs/reconocimiento-congreso.pdf',
    signatories: 'Comisión de Salud del Congreso de la Ciudad de México',
  },
  {
    id: 'acta-jornada-parque',
    title: 'Acta de entrega-recepción de la Jornada de Rehabilitación Alameda Norte',
    agency: 'Alcaldía — Dirección de Servicios Urbanos',
    date: '2026-06-08',
    reference: 'ALC/SU/2026-0310',
    category: 'Acta',
    description:
      'Documento que certifica la entrega de áreas rehabilitadas, inventario de mobiliario y compromisos de mantenimiento compartido.',
    file: '/docs/acta-jornada-parque.pdf',
    signatories: 'Dirección de Servicios Urbanos y Papá Ganjah A.C.',
  },
]

export const annualReport = {
  title: 'Informe anual de transparencia 2025',
  description:
    'Convenios, oficios, destino de donativos y resultados de nuestros programas comunitarios.',
  file: '/docs/informe-anual-2025.pdf',
}
