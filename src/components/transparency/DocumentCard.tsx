import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Hash,
  Handshake,
  type LucideIcon,
} from 'lucide-react'
import type { LegalDocument } from '@/types'
import { formatLongDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

const categoryIcons: Record<LegalDocument['category'], LucideIcon> = {
  Convenio: Handshake,
  Oficio: FileText,
  Reconocimiento: Award,
  Acta: ClipboardCheck,
}

type DocumentCardProps = {
  document: LegalDocument
  onOpen: (document: LegalDocument) => void
}

export function DocumentCard({ document, onOpen }: DocumentCardProps) {
  const Icon = categoryIcons[document.category]

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream">
          <Icon className="size-5" />
        </span>
        <Badge variant="verified">
          <BadgeCheck className="size-3.5" />
          Sello Oficial Confirmado
        </Badge>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-forest-600">
          {document.category}
        </p>
        <h3 className="mt-2 text-balance text-lg font-extrabold leading-snug tracking-tight text-ink">
          {document.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {document.description}
        </p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-start gap-2.5 text-slate-600">
            <Building2 className="mt-0.5 size-4 shrink-0 text-forest-500" />
            <div>
              <dt className="sr-only">Dependencia</dt>
              <dd className="text-pretty text-[13px] leading-snug">
                {document.agency}
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <CalendarDays className="size-4 shrink-0 text-forest-500" />
            <dt className="sr-only">Fecha</dt>
            <dd className="text-[13px]">{formatLongDate(document.date)}</dd>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <Hash className="size-4 shrink-0 text-forest-500" />
            <dt className="sr-only">Referencia</dt>
            <dd className="font-mono text-[11px] tracking-wide text-slate-500">
              {document.reference}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-[11px] font-medium text-slate-400">
          PDF · Documento público
        </span>
        <button
          type="button"
          onClick={() => onOpen(document)}
          className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3.5 py-2 text-xs font-bold text-forest-800 transition-colors hover:bg-forest-700 hover:text-cream"
        >
          Ver documento
          <FileText className="size-3.5" />
        </button>
      </div>
    </article>
  )
}
