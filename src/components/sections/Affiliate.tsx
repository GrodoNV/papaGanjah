import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Loader2,
  Lock,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const affiliateSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, 'Escribe tu nombre completo (mínimo 3 caracteres).')
    .max(80, 'El nombre no puede exceder 80 caracteres.'),
  correo: z
    .string()
    .trim()
    .min(1, 'Escribe tu correo electrónico.')
    .email('Escribe un correo electrónico válido.'),
  telefono: z
    .string()
    .trim()
    .regex(
      /^[0-9+()\s-]{10,20}$/,
      'Escribe un teléfono válido de al menos 10 dígitos.',
    ),
  ciudad: z
    .string()
    .trim()
    .min(2, 'Indica tu ciudad.')
    .max(80, 'La ciudad no puede exceder 80 caracteres.'),
  motivacion: z
    .string()
    .trim()
    .min(20, 'Cuéntanos brevemente por qué quieres sumarte (mínimo 20 caracteres).')
    .max(600, 'El mensaje no puede exceder 600 caracteres.'),
  acepto: z
    .boolean()
    .refine(
      (value) => value === true,
      'Necesitamos tu consentimiento para tratar tus datos.',
    ),
})

type AffiliateValues = z.infer<typeof affiliateSchema>

const steps = [
  {
    title: 'Comparte tus datos',
    description:
      'Nos interesa conocer tu ciudad y tu motivación para integrarte con respeto al grupo.',
  },
  {
    title: 'Te contactamos',
    description:
      'En un plazo de 3 a 5 días hábiles recibirás una invitación a una sesión informativa.',
  },
  {
    title: 'Participa',
    description:
      'Puedes sumarte a talleres, jornadas de voluntariado o mesas de trabajo según tu interés.',
  },
]

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-xs font-bold text-ink">
          {label} <span className="text-clay">*</span>
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[11px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function Affiliate() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AffiliateValues>({
    resolver: zodResolver(affiliateSchema),
    mode: 'onTouched',
    defaultValues: {
      nombre: '',
      correo: '',
      telefono: '',
      ciudad: '',
      motivacion: '',
      acepto: false,
    },
  })

  const [submittedName, setSubmittedName] = useState('')
  const motivationLength = watch('motivacion')?.length ?? 0

  const inputClass = (invalid: boolean) =>
    cn(
      'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-4',
      invalid
        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
        : 'border-slate-200 focus:border-forest-500 focus:ring-forest-500/10',
    )

  const onSubmit = async (values: AffiliateValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    setSubmittedName(values.nombre.trim().split(/\s+/)[0])
    reset()
  }

  return (
    <Section id="afiliate" tone="sage" className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-sage opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-2">
            <SectionHeading
              eyebrow="Afíliate"
              title={
                <>
                  Súmate al{' '}
                  <span className="font-display font-medium italic text-forest-600">
                    colectivo
                  </span>
                  .
                </>
              }
              description="Buscamos personas mayores de edad que quieran aportar tiempo, conocimiento o experiencia desde el respeto, la legalidad y el cuidado de la comunidad."
            />

            <ol className="mt-9 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-forest-200 bg-white text-xs font-extrabold text-forest-700 shadow-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-forest-200/70 bg-white/70 p-4">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest-600" />
              <p className="text-[11px] leading-relaxed text-forest-900/80">
                La afiliación es voluntaria y gratuita. Tus datos se tratan
                conforme al Aviso de Privacidad y no se comparten con terceros
                sin tu consentimiento.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white p-6 shadow-soft sm:p-8">
            {submittedName ? (
              <div className="flex min-h-[32rem] flex-col items-center justify-center py-8 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-forest-50 text-forest-700">
                  <CheckCircle2 className="size-8" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
                  Gracias, {submittedName}.
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                  Recibimos tu solicitud de afiliación. Te contactaremos en un
                  plazo de 3 a 5 días hábiles con los siguientes pasos.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setSubmittedName('')}>
                    Enviar otra solicitud
                  </Button>
                  <Button variant="soft" size="sm" onClick={() => setSubmittedName('')}>
                    <HeartHandshake className="size-4" />
                    Volver al formulario
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-ink">
                      Formulario de afiliación
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Todos los campos son obligatorios.
                    </p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                    <Sparkles className="size-5" />
                  </span>
                </div>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <Field
                    id="nombre"
                    label="Nombre completo"
                    error={errors.nombre?.message}
                  >
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Ej. Ana Martínez"
                      className={inputClass(Boolean(errors.nombre))}
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                      {...register('nombre')}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="correo"
                      label="Correo electrónico"
                      error={errors.correo?.message}
                    >
                      <input
                        id="correo"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@correo.com"
                        className={inputClass(Boolean(errors.correo))}
                        aria-invalid={Boolean(errors.correo)}
                        aria-describedby={errors.correo ? 'correo-error' : undefined}
                        {...register('correo')}
                      />
                    </Field>

                    <Field
                      id="telefono"
                      label="Teléfono"
                      error={errors.telefono?.message}
                    >
                      <input
                        id="telefono"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="55 1234 5678"
                        className={inputClass(Boolean(errors.telefono))}
                        aria-invalid={Boolean(errors.telefono)}
                        aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                        {...register('telefono')}
                      />
                    </Field>
                  </div>

                  <Field
                    id="ciudad"
                    label="Ciudad"
                    error={errors.ciudad?.message}
                  >
                    <input
                      id="ciudad"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Ciudad de México"
                      className={inputClass(Boolean(errors.ciudad))}
                      aria-invalid={Boolean(errors.ciudad)}
                      aria-describedby={errors.ciudad ? 'ciudad-error' : undefined}
                      {...register('ciudad')}
                    />
                  </Field>

                  <Field
                    id="motivacion"
                    label="Mensaje de motivación"
                    error={errors.motivacion?.message}
                    hint={
                      <span
                        className={cn(
                          'text-[10px] font-semibold',
                          motivationLength > 600 ? 'text-red-500' : 'text-slate-400',
                        )}
                      >
                        {motivationLength}/600
                      </span>
                    }
                  >
                    <textarea
                      id="motivacion"
                      rows={4}
                      placeholder="Cuéntanos qué te gustaría aportar y por qué te interesa sumarte."
                      className={cn(inputClass(Boolean(errors.motivacion)), 'resize-y')}
                      aria-invalid={Boolean(errors.motivacion)}
                      aria-describedby={errors.motivacion ? 'motivacion-error' : undefined}
                      {...register('motivacion')}
                    />
                  </Field>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <input
                        type="checkbox"
                        className="mt-0.5 size-4 shrink-0 rounded border-slate-300 accent-forest-700"
                        aria-invalid={Boolean(errors.acepto)}
                        aria-describedby={errors.acepto ? 'acepto-error' : undefined}
                        {...register('acepto')}
                      />
                      <span className="text-[11px] leading-relaxed text-slate-600">
                        Soy mayor de 18 años y acepto el tratamiento de mis
                        datos personales para fines de contacto y participación
                        en el colectivo, conforme al Aviso de Privacidad.
                      </span>
                    </label>
                    {errors.acepto && (
                      <p
                        id="acepto-error"
                        role="alert"
                        className="mt-1.5 text-[11px] font-semibold text-red-600"
                      >
                        {errors.acepto.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Enviando solicitud…
                      </>
                    ) : (
                      <>
                        Enviar solicitud
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400">
                    <Lock className="size-3" />
                    Tus datos se tratan de forma confidencial.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest-800 px-6 py-6 text-cream sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold">
              <HeartHandshake className="size-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold">¿Prefieres escribirnos primero?</p>
              <p className="mt-1 text-xs text-forest-100/75">
                También puedes conocer el colectivo en nuestros eventos abiertos
                antes de afiliarte.
              </p>
            </div>
          </div>
          <a
            href="#eventos"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-gold transition-colors hover:text-[#e8bb63]"
          >
            Ver próximos eventos
            <ArrowRight className="size-4" />
          </a>
        </div>
      </Container>
    </Section>
  )
}
