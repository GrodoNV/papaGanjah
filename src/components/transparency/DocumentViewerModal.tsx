import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  Hash,
  PenLine,
} from 'lucide-react'
import type { LegalDocument } from '@/types'
import { formatLongDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

type DocumentViewerModalProps = {
  document: LegalDocument | null
  onClose: () => void
}

export function DocumentViewerModal({
  document,
  onClose,
}: DocumentViewerModalProps) {
  return (
    <Modal
      open={Boolean(document)}
      onClose={onClose}
      title={document?.title ?? ''}
      description={
        document
          ? `${document.agency} · ${formatLongDate(document.date)}`
          : undefined
      }
      icon={<FileText className="size-5" />}
      size="xl"
      bodyClassName="px-4 py-5 sm:px-6"
      footer={
        document ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Badge variant="verified">
              <BadgeCheck className="size-3.5" />
              Sello Oficial Confirmado
            </Badge>
            <div className="flex flex-col gap-2 sm:flex-row">
              <ButtonLink
                href={document.file}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="sm"
              >
                <ExternalLink className="size-4" />
                Abrir en nueva pestaña
              </ButtonLink>
              <ButtonLink href={document.file} download size="sm">
                <Download className="size-4" />
                Descargar PDF
              </ButtonLink>
            </div>
          </div>
        ) : undefined
      }
    >
      {document && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                <Building2 className="size-3.5" />
                Dependencia
              </p>
              <p className="mt-1.5 text-xs font-semibold leading-snug text-ink">
                {document.agency}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                <CalendarDays className="size-3.5" />
                Fecha
              </p>
              <p className="mt-1.5 text-xs font-semibold text-ink">
                {formatLongDate(document.date)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                <Hash className="size-3.5" />
                Referencia
              </p>
              <p className="mt-1.5 font-mono text-[11px] font-semibold tracking-wide text-ink">
                {document.reference}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-sage/60 px-4 py-3 text-xs leading-relaxed text-forest-900">
            <PenLine className="mt-0.5 size-4 shrink-0 text-forest-600" />
            <p>
              <span className="font-bold">Suscrito por:</span>{' '}
              {document.signatories}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <iframe
              src={`${document.file}#view=FitH`}
              title={`Vista previa del documento: ${document.title}`}
              className="h-[58vh] min-h-[360px] w-full"
            />
          </div>

          <p className="text-center text-[11px] text-slate-400">
            Si tu navegador no muestra el documento, usa “Abrir en nueva
            pestaña” o descarga el PDF.
          </p>
        </div>
      )}
    </Modal>
  )
}
