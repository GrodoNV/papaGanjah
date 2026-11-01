import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  FileCheck2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sprout,
  Trees,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const trustItems = [
  {
    icon: ShieldCheck,
    label: 'Actuación 100% legal',
    detail: 'Cumplimiento normativo',
  },
  {
    icon: Building2,
    label: 'Colaboración institucional',
    detail: 'Convenios publicados',
  },
  {
    icon: HeartHandshake,
    label: 'Impacto comunitario',
    detail: 'Acciones verificables',
  },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-paper pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-52 size-[42rem] rounded-full bg-forest-100/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-52 bottom-0 size-[32rem] rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-sage opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="animate-slide-up lg:col-span-6">
            <Badge variant="soft" className="px-3 py-1.5">
              <Sprout className="size-3.5" />
              Colectivo pro-cannabis legal · Desde 2019
            </Badge>

            <h1 className="mt-6 text-balance text-[2.7rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.15rem]">
              El cannabis es una{' '}
              <span className="relative inline-block font-display font-medium italic tracking-[-0.02em] text-forest-600">
                opción
                <span
                  className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-gold/70"
                  aria-hidden="true"
                />
              </span>
              .
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Somos un colectivo ciudadano que colabora con autoridades,
              profesionales de la salud y vecinos para transformar la
              conversación sobre el cannabis: información clara, cumplimiento
              legal y acciones que mejoran nuestro entorno.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#afiliate" size="lg" className="w-full sm:w-auto">
                Únete al Colectivo
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="#transparencia"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <FileCheck2 className="size-4" />
                Ver Transparencia Legal
              </ButtonLink>
            </div>

            <div className="mt-9 grid gap-4 border-t border-slate-200/80 pt-6 sm:grid-cols-3 sm:gap-3">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-white text-forest-700 shadow-sm ring-1 ring-slate-200/70">
                    <item.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold leading-tight text-ink">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Cada oficio, convenio y acta está disponible para consulta.{' '}
              <a
                href="#transparencia"
                className="inline-flex items-center gap-1 font-semibold text-forest-700 underline decoration-forest-300 underline-offset-4 transition-colors hover:text-forest-900"
              >
                Revisa los documentos
                <ArrowUpRight className="size-3.5" />
              </a>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-lg animate-slide-up lg:col-span-6 lg:max-w-none [animation-delay:120ms]">
            <div
              className="absolute -inset-5 rounded-[3rem] bg-linear-to-br from-forest-100 via-cream to-sage opacity-90 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative rounded-[2.25rem] border border-white/80 bg-white/80 p-2 shadow-soft backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.7rem]">
                <img
                  src="/img/park-after.svg"
                  alt="Ilustración del Parque Alameda Norte rehabilitado, con vecinos, árboles y áreas verdes"
                  className="aspect-[4/3.35] w-full object-cover"
                  width="1200"
                  height="900"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-forest-950/45 via-forest-950/5 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold text-forest-800 shadow-sm backdrop-blur">
                    <MapPin className="size-3.5" />
                    Parque Alameda Norte
                  </span>
                  <span className="hidden rounded-full bg-forest-950/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-cream backdrop-blur sm:inline">
                    Proyecto 2025 — 2026
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-forest-600">
                      Espacio recuperado
                    </p>
                    <p className="mt-1 text-xl font-extrabold tracking-tight text-ink">
                      3,200 m²
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-forest-950/45 px-3 py-2.5 text-cream backdrop-blur">
                    <Users className="size-4 text-forest-200" />
                    <div>
                      <p className="text-sm font-bold leading-none">120</p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-wide text-forest-100/80">
                        vecinos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-14 hidden w-56 animate-float-slow rounded-2xl border border-white/80 bg-white/95 p-4 shadow-soft backdrop-blur sm:block">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                  <BadgeCheck className="size-4.5" />
                </span>
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-forest-600">
                    Sello oficial
                  </p>
                  <p className="text-xs font-bold text-ink">
                    Confirmado
                  </p>
                </div>
              </div>
              <p className="mt-3 border-t border-slate-100 pt-2.5 text-[10px] leading-relaxed text-slate-500">
                Convenio SEMADS/DG/2025-0142
              </p>
            </div>

            <div className="absolute -right-3 top-12 hidden items-center gap-2.5 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-soft backdrop-blur md:flex">
              <span className="grid size-9 place-items-center rounded-xl bg-sage text-forest-700">
                <Trees className="size-4.5" />
              </span>
              <div>
                <p className="text-lg font-extrabold leading-none text-ink">86</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                  árboles nativos
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
