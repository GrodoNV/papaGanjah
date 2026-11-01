import {
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  Layers,
  Lock,
  Sparkles,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { book } from '@/data/book'
import { bookPurchaseHref } from '@/lib/purchase'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PaywallModal } from '@/components/book/PaywallModal'
import type { ReaderPreviewProps } from '@/components/book/ReaderPreview'

const ReaderPreview = lazy(() =>
  import('@/components/book/ReaderPreview').then((module) => ({
    default: module.ReaderPreview,
  })),
)

function ReaderSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-cream/15 bg-cream shadow-soft"
      aria-busy="true"
    >
      <div className="flex items-center justify-between gap-3 bg-forest-950 px-4 py-3">
        <span className="h-2.5 w-36 rounded-full bg-cream/20" />
        <span className="h-7 w-20 rounded-full bg-cream/10" />
      </div>
      <div className="flex min-h-[22rem] flex-col items-center justify-center gap-3 bg-slate-100/60 text-xs font-semibold text-slate-500 sm:min-h-[26rem]">
        <span
          className="size-6 animate-spin rounded-full border-2 border-forest-700/25 border-t-forest-700"
          aria-hidden="true"
        />
        Preparando la vista previa…
      </div>
      <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 bg-slate-50/70 px-4 py-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="size-7 rounded-lg border border-slate-200 bg-white"
          />
        ))}
      </div>
    </div>
  )
}

function DeferredReaderPreview(props: ReaderPreviewProps) {
  const holder = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )

  useEffect(() => {
    if (shouldLoad) return
    const element = holder.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '500px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={holder}>
      {shouldLoad ? (
        <Suspense fallback={<ReaderSkeleton />}>
          <ReaderPreview {...props} />
        </Suspense>
      ) : (
        <ReaderSkeleton />
      )}
    </div>
  )
}

export function BookSection() {
  const [paywallOpen, setPaywallOpen] = useState(false)

  return (
    <Section id="libro" tone="forest" className="overflow-hidden">
      <div
        className="pointer-events-none absolute -right-40 top-10 size-[34rem] rounded-full bg-forest-700/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 size-[30rem] rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fbf7ec_1px,transparent_1px)] [background-size:26px_26px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Libro del colectivo"
          title={
            <>
              Cannabis con{' '}
              <span className="font-display font-medium italic text-gold">
                criterio
              </span>
              .
            </>
          }
          description={book.subtitle}
          action={
            <Badge variant="outlineLight" className="px-3 py-1.5">
              <Sparkles className="size-3.5" />
              {book.edition}
            </Badge>
          }
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[21rem]">
              <div
                className="absolute -inset-5 rounded-[2rem] bg-forest-600/30 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative aspect-[3/4.25] overflow-hidden rounded-r-2xl rounded-l-md border border-cream/15 bg-linear-to-br from-forest-500 via-forest-700 to-forest-950 p-7 shadow-soft transition-transform duration-500 hover:rotate-0 sm:p-8 [transform:rotate(-2deg)]">
                <div
                  className="absolute inset-y-0 left-0 w-3 border-r border-forest-950/30 bg-forest-950/40"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-14 -top-14 size-44 rounded-full border border-cream/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-20 -left-16 size-52 rounded-full border border-cream/10"
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-forest-200">
                    <span>Papá Ganjah</span>
                    <span>2026</span>
                  </div>

                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-cream/90">
                      <BookOpen className="size-3" />
                      Edición del colectivo
                    </span>
                    <h3 className="mt-4 text-balance font-display text-[2.35rem] italic leading-[1.05] text-cream">
                      Cannabis con criterio
                    </h3>
                    <div
                      className="mt-5 h-0.5 w-14 bg-gold"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-pretty text-[11px] leading-relaxed text-forest-100/80">
                      Una guía ciudadana para entender la regulación, cuidar la
                      salud y construir acuerdos.
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cream">
                        Colectivo Papá Ganjah
                      </p>
                      <p className="mt-1 text-[9px] text-forest-200/70">
                        Primera edición
                      </p>
                    </div>
                    <span className="grid size-11 place-items-center rounded-full border border-gold/50 font-display text-sm italic text-gold">
                      PG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-cream/10 bg-white/[0.04] px-3 py-3 text-center">
                <FileText className="mx-auto size-4 text-forest-300" />
                <p className="mt-2 text-sm font-extrabold text-cream">
                  {book.pages}
                </p>
                <p className="text-[9px] uppercase tracking-wide text-forest-300/80">
                  Páginas
                </p>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-white/[0.04] px-3 py-3 text-center">
                <Layers className="mx-auto size-4 text-forest-300" />
                <p className="mt-2 text-sm font-extrabold text-cream">
                  PDF · EPUB
                </p>
                <p className="text-[9px] uppercase tracking-wide text-forest-300/80">
                  Digital
                </p>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-white/[0.04] px-3 py-3 text-center">
                <BookOpen className="mx-auto size-4 text-forest-300" />
                <p className="mt-2 text-sm font-extrabold text-cream">1ª</p>
                <p className="text-[9px] uppercase tracking-wide text-forest-300/80">
                  Edición
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-cream/10 bg-white/[0.04] p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                Qué encontrarás
              </p>
              <ul className="mt-4 space-y-3">
                {book.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-forest-100/80"
                  >
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-forest-700 text-cream">
                      <Check className="size-2.5" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                  Léelo antes de comprar
                </p>
                <p className="mt-1 text-sm text-forest-100/75">
                  Acceso libre a las primeras {book.previewPages} páginas del
                  libro.
                </p>
              </div>
              <Badge variant="outlineLight">
                <BookOpen className="size-3.5" />
                Vista previa
              </Badge>
            </div>

            <DeferredReaderPreview
              book={book}
              onRequestUnlock={() => setPaywallOpen(true)}
            />

            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-forest-200/60">
              <Lock className="mt-0.5 size-3.5 shrink-0 text-forest-300" />
              El visor permite leer únicamente las primeras {book.previewPages}{' '}
              páginas. Al intentar avanzar a la página {book.previewPages + 1},
              se muestra la opción para adquirir la edición completa.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                Venta digital y física
              </p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-cream sm:text-2xl">
                Elige tu formato
              </h3>
            </div>
            <p className="text-xs text-forest-200/60">
              Envío nacional incluido en la edición física
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {book.formats.map((format) => {
              const highlighted = format.highlighted
              return (
                <div
                  key={format.id}
                  className={cn(
                    'flex flex-col rounded-3xl border p-6',
                    highlighted
                      ? 'border-gold/40 bg-cream text-forest-950'
                      : 'border-cream/15 bg-white/[0.05] text-cream',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={cn(
                          'text-[10px] font-extrabold uppercase tracking-[0.18em]',
                          highlighted ? 'text-forest-600' : 'text-forest-300',
                        )}
                      >
                        {format.name}
                      </p>
                      <p className="mt-1 text-3xl font-extrabold tracking-tight">
                        {format.price}
                      </p>
                    </div>
                    {highlighted && (
                      <Badge variant="verified">
                        <Sparkles className="size-3.5" />
                        Más elegido
                      </Badge>
                    )}
                  </div>

                  <p
                    className={cn(
                      'mt-2 text-sm leading-relaxed',
                      highlighted ? 'text-slate-600' : 'text-forest-100/75',
                    )}
                  >
                    {format.description}
                  </p>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {format.perks.map((perk) => (
                      <li
                        key={perk}
                        className={cn(
                          'flex items-start gap-2 text-xs',
                          highlighted ? 'text-slate-600' : 'text-forest-100/75',
                        )}
                      >
                        <Check
                          className={cn(
                            'mt-0.5 size-3.5 shrink-0',
                            highlighted ? 'text-forest-600' : 'text-gold',
                          )}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={bookPurchaseHref(book, format)}
                    variant={highlighted ? 'primary' : 'outlineLight'}
                    size="md"
                    className="mt-6 w-full sm:w-auto sm:self-start"
                  >
                    Comprar {format.id === 'digital' ? 'digital' : 'físico'}
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
              )
            })}
          </div>
        </div>
      </Container>

      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        book={book}
      />
    </Section>
  )
}
