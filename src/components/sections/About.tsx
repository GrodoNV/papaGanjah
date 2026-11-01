import {
  BookOpen,
  Compass,
  Eye,
  Quote,
  Scale,
  Target,
  Users,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const pillars = [
  {
    icon: Scale,
    title: 'Legalidad verificable',
    description:
      'Cada convenio, oficio y acta se documenta y se publica. La transparencia no es un gesto: es una condición para colaborar.',
  },
  {
    icon: BookOpen,
    title: 'Educación sin estigmas',
    description:
      'Talleres, materiales y conversaciones con evidencia para que las decisiones se tomen con información y responsabilidad.',
  },
  {
    icon: Users,
    title: 'Comunidad activa',
    description:
      'Rehabilitamos espacios públicos, acompañamos a vecinos y construimos redes de cuidado en el territorio.',
  },
]

const milestones = [
  { year: '2019', text: 'Nace el colectivo como espacio de diálogo ciudadano.' },
  { year: '2021', text: 'Primer convenio de colaboración con una alcaldía.' },
  { year: '2024', text: 'Arranca el programa de salud y reducción de riesgos.' },
  { year: '2026', text: 'Publicamos el libro y el informe anual de transparencia.' },
]

export function About() {
  return (
    <Section id="nosotros" tone="paper">
      <Container>
        <SectionHeading
          eyebrow="Quiénes somos"
          title={
            <>
              Un colectivo que elige{' '}
              <span className="font-display font-medium italic text-forest-600">
                construir
              </span>
              , no confrontar.
            </>
          }
          description="Papá Ganjah es una organización civil que trabaja por una conversación seria, humana y legal sobre el cannabis. No buscamos protagonismo: buscamos acuerdos que mejoren la vida de las personas y el cuidado de nuestros territorios."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card">
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                <Target className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">
                Nuestra misión
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Promover el acceso a información veraz y la colaboración
                institucional para que el cannabis se aborde desde la salud, los
                derechos y la responsabilidad, sin estigmas ni desinformación.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card">
              <span className="grid size-11 place-items-center rounded-2xl bg-cream text-clay">
                <Eye className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">
                Nuestra visión
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Una sociedad donde las decisiones sobre cannabis se tomen con
                evidencia, diálogo y respeto, y donde los colectivos ciudadanos
                sean interlocutores confiables de las autoridades.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card sm:col-span-2">
              <div className="flex items-center gap-2.5">
                <Compass className="size-4 text-forest-600" />
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-forest-700">
                  Nuestros principios
                </h3>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <div key={pillar.title}>
                    <span className="grid size-9 place-items-center rounded-xl bg-sage text-forest-700">
                      <pillar.icon className="size-4" />
                    </span>
                    <h4 className="mt-3 text-sm font-bold text-ink">
                      {pillar.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-forest-800 p-7 text-cream shadow-soft sm:p-9 lg:col-span-5">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-forest-600/40 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-gold/10 blur-2xl"
              aria-hidden="true"
            />
            <Quote className="size-8 text-gold" aria-hidden="true" />
            <blockquote className="mt-5">
              <p className="font-display text-2xl italic leading-snug text-cream sm:text-[1.7rem]">
                “No pedimos permiso para existir; construimos acuerdos para
                convivir.”
              </p>
              <footer className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-forest-200">
                Manifiesto del colectivo
              </footer>
            </blockquote>

            <div className="mt-8 border-t border-cream/15 pt-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                Nuestra ruta
              </p>
              <ol className="mt-4 space-y-4">
                {milestones.map((milestone) => (
                  <li key={milestone.year} className="flex gap-4">
                    <span className="w-10 shrink-0 font-display text-sm italic text-gold">
                      {milestone.year}
                    </span>
                    <span className="relative border-l border-cream/15 pb-1 pl-4 text-xs leading-relaxed text-forest-100/80">
                      <span
                        className="absolute -left-[3.5px] top-1.5 size-1.5 rounded-full bg-gold"
                        aria-hidden="true"
                      />
                      {milestone.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
