import type { Book } from '@/types'

export const book: Book = {
  title: 'Cannabis con criterio',
  subtitle:
    'Una guía ciudadana para entender la regulación, cuidar la salud y construir acuerdos',
  author: 'Colectivo Papá Ganjah',
  pages: 168,
  edition: 'Primera edición · 2026',
  synopsis:
    'Un libro escrito desde la experiencia de un colectivo que eligió la legalidad, la evidencia y el diálogo. Reúne herramientas prácticas para entender el marco normativo, reducir riesgos, cuidar la salud y participar en la construcción de políticas públicas más humanas.',
  highlights: [
    'Marco legal y derechos: qué permite la normativa local y cómo ejercerlos con responsabilidad.',
    'Salud y reducción de riesgos: información clara, sin estigmas ni promesas falsas.',
    'Comunidad y territorio: metodologías para rehabilitar espacios públicos con vecinos.',
    'Transparencia: cómo documentar convenios y rendir cuentas ante la comunidad.',
  ],
  formats: [
    {
      id: 'digital',
      name: 'Edición digital',
      price: '$180 MXN',
      description: 'PDF y EPUB con acceso inmediato a la versión completa.',
      perks: ['Descarga inmediata', 'Lectura en cualquier dispositivo', 'Actualizaciones de la edición'],
      highlighted: true,
    },
    {
      id: 'fisica',
      name: 'Edición física',
      price: '$350 MXN',
      description: 'Libro impreso, papel reciclado y envío nacional incluido.',
      perks: ['Envío incluido en México', 'Papel reciclado', 'Dedicatoria del colectivo'],
    },
  ],
  previewFile: '/docs/libro-muestra.pdf',
  previewPages: 5,
}
