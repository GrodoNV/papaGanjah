import {
  ArrowRight,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { events } from '@/data/events'
import { site } from '@/data/navigation'
import { getDateParts } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const filters = ['Todos', 'Gratuito', 'De costo'] as const
type Filter = (typeof filters)[number]

function registrationHref(title: string, email: string) {
  const subject = `Reserva de lugar: ${title}`
  const body = `Hola, quiero reservar un lugar para "${title}". Mi nombre es: `
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function Events() {
  const [filter, setFilter] = useState<Filter>('Todos')

  const filtered = useMemo(() => {
    if (filter === 'Todos') return events
    return events.filter((event) => event.type === filter)
  }, [filter])

  return (
    <Section id="eventos" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Eventos y talleres"
          title={
            <>
              Encuentros para aprender,{' '}
              <span className="font-display font-medium italic text-forest-600">
                participar
              </span>{' '}
              y convivir.
            </>
          }
          description="Foros, talleres y jornadas de voluntariado abiertas a la comunidad. Algunos son gratuitos y otros tienen una cuota de recuperación para materiales."
          action={
            <ButtonLink href={`mailto:${site.eventsEmail}`} variant="secondary" size="md">
              <Mail className="size-4" />
              Recibir el calendario
            </ButtonLink>
          }
        />

        <div className="mt-9 flex flex-wrap items-center gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-bold transition-colors',
                filter === item
                  ? 'border-forest-700 bg-forest-700 text-cream'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-forest-300 hover:text-forest-800',
              )}
            >
              {item}
              <span
                className={cn(
                  'ml-2 rounded-full px-1.5 py-0.5 text-[10px]',
                  filter === item ? 'bg-white/15 text-cream' : 'bg-slate-100 text-slate-500',
                )}
              >
                {item === 'Todos'
                  ? events.length
                  : events.filter((event) => event.type === item).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {filtered.map((event) => {
            const date = getDateParts(event.date)
            const spots = Math.max(event.capacity - event.registered, 0)
            const occupancy = Math.min(
              Math.round((event.registered / event.capacity) * 100),
              100,
            )
            const almostFull = spots <= event.capacity * 0.2

            return (
              <article
                key={event.id}
                className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-soft sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-forest-700 text-cream shadow-sm">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-forest-200">
                        {date.month}
                      </span>
                      <span className="text-2xl font-extrabold leading-none">
                        {date.day}
                      </span>
                    </div>
                    <div>
                      <Badge variant={event.type === 'Gratuito' ? 'verified' : 'gold'}>
                        {event.type === 'Gratuito' ? 'Gratuito' : event.price}
                      </Badge>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] capitalize text-slate-500">
                        <CalendarDays className="size-3.5" />
                        {date.weekday}
                        <span className="text-slate-300">·</span>
                        <Clock className="size-3.5" />
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-sage px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-forest-700 sm:inline">
                    {event.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-balance text-lg font-extrabold leading-snug tracking-tight text-ink">
                  {event.title}
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-slate-500">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-forest-500" />
                  {event.location} · {event.city}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {event.description}
                </p>

                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Users className="size-3.5 text-forest-500" />
                      {event.registered} de {event.capacity} lugares
                    </span>
                    <span
                      className={cn(
                        'font-bold',
                        almostFull ? 'text-clay' : 'text-forest-700',
                      )}
                    >
                      {almostFull ? 'Casi lleno' : `${spots} disponibles`}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={event.capacity}
                    aria-valuenow={event.registered}
                    aria-label={`Cupo ocupado de ${event.title}`}
                  >
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        almostFull ? 'bg-clay' : 'bg-forest-500',
                      )}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Cupo limitado
                    </span>
                    <ButtonLink
                      href={registrationHref(event.title, event.registrationEmail)}
                      size="sm"
                      variant={event.type === 'Gratuito' ? 'primary' : 'secondary'}
                    >
                      Reservar lugar
                      <ArrowRight className="size-4" />
                    </ButtonLink>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="flex items-start gap-2.5">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-forest-600" />
            ¿Quieres proponer un taller o llevar una jornada a tu colonia?
            Escríbenos a{' '}
            <a
              href={`mailto:${site.eventsEmail}`}
              className="font-semibold text-forest-700 underline decoration-forest-300 underline-offset-2"
            >
              {site.eventsEmail}
            </a>
          </p>
          <ButtonLink href="#afiliate" variant="soft" size="sm">
            Sumarme al colectivo
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}
