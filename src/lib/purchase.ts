import { site } from '@/data/navigation'
import type { Book, BookFormat } from '@/types'

export function bookPurchaseHref(book: Book, format: BookFormat) {
  const subject = `Quiero adquirir ${book.title} — ${format.name}`
  const body = [
    'Hola, me interesa adquirir la versión completa del libro.',
    '',
    `Título: ${book.title}`,
    `Formato: ${format.name}`,
    `Precio: ${format.price}`,
    '',
    'Por favor, envíenme las instrucciones de pago y entrega.',
    '',
    'Gracias.',
  ].join('\n')

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
