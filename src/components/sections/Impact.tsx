import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { communityEntries, featuredProject } from '@/data/impact'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BeforeAfter } from '@/components/impact/BeforeAfter'
import { CommunityEntryCard } from '@/components/impact/CommunityEntryCard'
import { ImpactMetrics } from '@/components/impact/ImpactMetrics'

export function Impact() {
  return (
    <Section id="impacto" tone="paper">
      <Container>
        <SectionHeading
          eyebrow="Impacto comunitario y social"
          title={
            <>
              Acciones que se pueden{' '}
              <span className="font-display font-medium italic text-forest-600">
                ver y medir
              </span>
              .
            </>
          }
          description="No hablamos solo de intenciones. Documentamos cada jornada, cada espacio recuperado y cada persona que participa. Esta es nuestra bitácora de trabajo en territorio."
          action={
            <ButtonLink href="#eventos" variant="soft" size="md">
              <CalendarDays className="size-4" />
              Próximas jornadas
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BeforeAfter
              before={featuredProject.beforeImage}
              after={featuredProject.afterImage}
              alt="Parque Alameda Norte antes y después de la rehabilitación"
            />
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-7">
              <Badge variant="gold">
                <Sparkles className="size-3.5" />
                Proyecto destacado
              </Badge>
              <h3 className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-ink">
                {featuredProject.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-forest-500" />
                  {featuredProject.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-forest-500" />
                  {featuredProject.year}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {featuredProject.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-forest-200 bg-forest-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-forest-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                {featuredProject.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-base font-extrabold tracking-tight text-forest-800">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#transparencia"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 underline decoration-forest-300 underline-offset-4 transition-colors hover:text-forest-900"
              >
                Consulta el acta de entrega
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ImpactMetrics />
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-forest-600">
                Bitácora comunitaria
              </p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                Proyectos recientes
              </h3>
            </div>
            <p className="max-w-md text-sm text-slate-500">
              Cada proyecto se planea con vecinos, se ejecuta con voluntariado y
              se documenta con evidencias.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {communityEntries.map((entry) => (
              <CommunityEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
