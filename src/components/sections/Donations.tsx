import {
  Banknote,
  Check,
  Copy,
  Download,
  Heart,
  HeartHandshake,
  Mail,
  PieChart,
  QrCode,
  ShieldCheck,
} from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useRef, useState } from 'react'
import { donation } from '@/data/donation'
import { site } from '@/data/navigation'
import { copyText } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Donations() {
  const qrRef = useRef<HTMLCanvasElement>(null)
  const [downloaded, setDownloaded] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!downloaded) return
    const timer = window.setTimeout(() => setDownloaded(false), 2600)
    return () => window.clearTimeout(timer)
  }, [downloaded])

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])

  const downloadQr = () => {
    const canvas = qrRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'papaganjah-donativo-qr.png'
    link.click()
    setDownloaded(true)
  }

  const handleCopy = async () => {
    const success = await copyText(donation.clabe)
    if (success) setCopied(true)
  }

  return (
    <Section id="donar" tone="paper" className="overflow-hidden">
      <div
        className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-forest-100/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          eyebrow="Donativos"
          title={
            <>
              Tu apoyo siembra{' '}
              <span className="font-display font-medium italic text-forest-600">
                cambios reales
              </span>
              .
            </>
          }
          description="Cada aporte se convierte en herramientas, talleres y jornadas de rehabilitación. No necesitas donar mucho: necesitas sumarte."
        />

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft">
          <div className="grid md:grid-cols-[1.02fr_1fr]">
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-forest-600 via-forest-700 to-forest-900 p-7 text-center text-cream sm:p-9">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-cream/10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full border border-cream/10"
                aria-hidden="true"
              />

              <Badge variant="outlineLight" className="relative">
                <ShieldCheck className="size-3.5" />
                Donativo seguro
              </Badge>

              <div className="relative mt-5 rounded-3xl border border-white/40 bg-white p-4 shadow-xl">
                <div className="rounded-2xl bg-white p-1">
                  <QRCodeCanvas
                    ref={qrRef}
                    value={donation.qrValue}
                    size={512}
                    level="M"
                    marginSize={3}
                    bgColor="#ffffff"
                    fgColor="#1E4D2B"
                    title="Código QR oficial para donativos a Papá Ganjah"
                    className="h-auto w-full max-w-[13.5rem]"
                  />
                </div>
              </div>

              <p className="relative mt-4 flex items-center gap-1.5 text-[11px] font-medium text-forest-100/80">
                <QrCode className="size-3.5" />
                Escanea desde tu app bancaria
              </p>

              <Button
                variant="gold"
                size="md"
                onClick={downloadQr}
                className="relative mt-5 w-full max-w-[15rem]"
              >
                {downloaded ? (
                  <>
                    <Check className="size-4" />
                    QR descargado
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    Descargar Código QR
                  </>
                )}
              </Button>

              <p className="relative mt-3 text-[10px] text-forest-100/60">
                Compatible con transferencias bancarias y pagos móviles
              </p>
            </div>

            <div className="flex flex-col p-7 sm:p-9">
              <span className="grid size-11 place-items-center rounded-2xl bg-cream text-clay">
                <HeartHandshake className="size-5" />
              </span>

              <p className="mt-5 text-balance font-display text-2xl italic leading-snug text-forest-900 sm:text-[1.65rem]">
                “{donation.thankYou}”
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Con tu donativo financiamos materiales para las jornadas,
                talleres gratuitos de reducción de riesgos y el mantenimiento de
                los espacios que recuperamos junto a los vecinos.
              </p>

              <dl className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Banco
                  </dt>
                  <dd className="text-xs font-semibold text-ink">
                    {donation.bank}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Titular
                  </dt>
                  <dd className="text-right text-xs font-semibold text-ink">
                    {donation.accountHolder}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    CLABE
                  </dt>
                  <dd className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold tracking-wide text-ink">
                      {donation.clabe}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-forest-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-forest-700 hover:text-cream"
                      aria-label="Copiar CLABE"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          Copiar
                        </>
                      )}
                    </button>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Referencia
                  </dt>
                  <dd className="font-mono text-[11px] font-semibold text-ink">
                    {donation.reference}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
                Si deseas recibir un comprobante o constancia de tu donativo,
                puedes enviar tu captura al correo:{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-forest-700"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/60 px-7 py-6 sm:px-9">
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-forest-700">
              <PieChart className="size-4" />
              Cómo usamos tu donativo
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {donation.allocation.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-600">
                    <span>{item.label}</span>
                    <span className="font-extrabold text-forest-800">
                      {item.value}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-forest-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-center gap-2 text-center text-[11px] text-slate-400 sm:flex-row">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-forest-500" />
            Recibimos donativos por transferencia bancaria directa.
          </span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Banknote className="size-3.5 text-forest-500" />
            Publicamos el destino de los recursos en Transparencia.
          </span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 font-semibold text-slate-500 transition-colors hover:text-forest-700"
          >
            <Mail className="size-3.5" />
            {site.email}
          </a>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400">
          <Heart className="size-3 text-clay" />
          Gracias por sembrar el cambio con nosotros.
        </p>
      </Container>
    </Section>
  )
}
