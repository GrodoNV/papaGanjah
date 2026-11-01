import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Lock,
  ShieldCheck,
} from 'lucide-react'
import type { Book } from '@/types'
import { bookPurchaseHref } from '@/lib/purchase'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

type PaywallModalProps = {
  open: boolean
  onClose: () => void
  book: Book
}

export function PaywallModal({ open, onClose, book }: PaywallModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Te quedaste con ganas de más"
      description="Has llegado al final de la vista previa gratuita. La edición completa reúne seis capítulos, ejercicios prácticos y una guía de recursos."
      icon={<Lock className="size-5" />}
      size="lg"
      footer={
        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-forest-600" />
            Compra directa con el colectivo.
          </p>
          <p>
            ¿Dudas?{' '}
            <a
              href="mailto:contacto@papaganjah.org"
              className="font-semibold text-forest-700 underline underline-offset-2"
            >
              Escríbenos
            </a>
          </p>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-4">
          <BookOpen className="mt-0.5 size-5 shrink-0 text-[#8a6415]" />
          <div>
            <p className="text-sm font-extrabold text-forest-950">
              Vista previa completada
            </p>
            <p className="mt-1 text-xs leading-relaxed text-forest-900/75">
              La versión completa de <strong>{book.title}</strong> tiene{' '}
              {book.pages} páginas y está disponible en digital y físico.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {book.formats.map((format) => (
            <div
              key={format.id}
              className={cn(
                'flex flex-col rounded-2xl border p-5',
                format.highlighted
                  ? 'border-forest-300 bg-forest-50/70'
                  : 'border-slate-200 bg-white',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-600">
                    {format.name}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                    {format.price}
                  </p>
                </div>
                {format.highlighted && (
                  <Badge variant="verified">
                    <BadgeCheck className="size-3.5" />
                    Recomendado
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {format.description}
              </p>
              <ul className="mt-4 space-y-2">
                {format.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-xs text-slate-600"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-forest-600" />
                    {perk}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={bookPurchaseHref(book, format)}
                variant={format.highlighted ? 'primary' : 'secondary'}
                size="sm"
                className="mt-5 w-full"
              >
                Comprar {format.id === 'digital' ? 'digital' : 'físico'}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] leading-relaxed text-slate-400">
          Al comprar recibirás las instrucciones de pago y entrega por correo
          electrónico. También puedes adquirirlo en nuestros eventos.
        </p>
      </div>
    </Modal>
  )
}
