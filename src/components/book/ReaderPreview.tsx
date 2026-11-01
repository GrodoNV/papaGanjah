import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileWarning,
  Loader2,
  Lock,
} from 'lucide-react'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import type { Book } from '@/types'
import { useElementWidth } from '@/hooks/useElementWidth'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

function ReaderLoading() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-xs font-medium text-slate-500">
      <Loader2 className="size-5 animate-spin text-forest-600" />
      Cargando vista previa…
    </div>
  )
}

export type ReaderPreviewProps = {
  book: Book
  onRequestUnlock: () => void
}

export function ReaderPreview({ book, onRequestUnlock }: ReaderPreviewProps) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const [page, setPage] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [failed, setFailed] = useState(false)

  const maxPreview = Math.max(
    1,
    Math.min(book.previewPages, numPages || book.previewPages),
  )
  const totalPages = Math.max(book.pages, numPages)
  const currentPage = Math.min(page, maxPreview)
  const pageWidth = Math.min(Math.max(width - 40, 230), 430)

  const goNext = () => {
    if (currentPage >= maxPreview) {
      onRequestUnlock()
      return
    }
    setPage(currentPage + 1)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-forest-800">
          <BookOpen className="size-4" />
          Vista previa oficial
        </span>
        <Badge variant="soft">
          {book.previewPages} páginas gratis
        </Badge>
      </div>

      <div
        ref={ref}
        className="pdf-reader flex min-h-[360px] items-center justify-center bg-slate-100/80 px-3 py-4 sm:px-5 sm:py-6"
      >
        {failed ? (
          <div className="flex max-w-xs flex-col items-center px-4 py-10 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-clay shadow-sm">
              <FileWarning className="size-6" />
            </span>
            <p className="mt-4 text-sm font-bold text-ink">
              No pudimos cargar el visor
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              Puedes abrir la vista previa en una nueva pestaña mientras
              restableces la conexión.
            </p>
            <a
              href={book.previewFile}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-2 text-xs font-bold text-cream transition-colors hover:bg-forest-800"
            >
              Abrir PDF
            </a>
          </div>
        ) : (
          <Document
            file={book.previewFile}
            onLoadSuccess={({ numPages: total }) => setNumPages(total)}
            onLoadError={() => setFailed(true)}
            loading={<ReaderLoading />}
            error={<ReaderLoading />}
          >
            {width > 0 && (
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={<ReaderLoading />}
              />
            )}
          </Document>
        )}
      </div>

      {currentPage >= maxPreview && !failed && (
        <div className="border-t border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-[11px] font-bold text-[#8a6415]">
          Fin de la vista previa gratuita · continúa con la edición completa
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-2 sm:justify-start">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-forest-300 hover:bg-forest-50 hover:text-forest-800 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="min-w-[8.5rem] text-center text-xs font-semibold text-slate-600 sm:text-left">
            Página <span className="font-extrabold text-ink">{currentPage}</span> de{' '}
            <span className="font-extrabold text-ink">{maxPreview}</span>
            <span className="block text-[10px] font-medium text-slate-400">
              del total de {totalPages} páginas
            </span>
          </p>
          <button
            type="button"
            onClick={goNext}
            className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-forest-300 hover:bg-forest-50 hover:text-forest-800"
            aria-label={
              currentPage >= maxPreview
                ? 'Desbloquear la página siguiente'
                : 'Página siguiente'
            }
          >
            {currentPage >= maxPreview ? (
              <Lock className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        </div>

        <Button onClick={onRequestUnlock} size="sm">
          <Lock className="size-4" />
          Desbloquear libro completo
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 border-t border-slate-100 bg-slate-50/70 px-4 py-3">
        {Array.from({ length: maxPreview }).map((_, index) => {
          const number = index + 1
          const active = number === currentPage

          return (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              aria-label={`Ir a la página ${number}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'grid size-7 place-items-center rounded-lg border text-[10px] font-bold transition-colors',
                active
                  ? 'border-forest-700 bg-forest-700 text-cream'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-forest-300 hover:text-forest-800',
              )}
            >
              {number}
            </button>
          )
        })}
        <span className="px-0.5 text-[10px] text-slate-300" aria-hidden="true">
          …
        </span>
        <button
          type="button"
          onClick={onRequestUnlock}
          aria-label={`Página ${maxPreview + 1}, bloqueada. Desbloquear libro completo`}
          className="grid size-7 place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-400 transition-colors hover:border-gold hover:text-[#8a6415]"
        >
          <Lock className="size-2.5" />
        </button>
      </div>
    </div>
  )
}
