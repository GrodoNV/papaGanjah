import {
  ArrowUpRight,
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { legalDisclaimer, privacyNotice } from '@/data/legal'
import { navigation, site } from '@/data/navigation'
import type { LegalText } from '@/types'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { LegalTextModal } from '@/components/legal/LegalTextModal'


function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14.2 21v-7.6h2.6l.4-3h-3V8.5c0-.9.25-1.5 1.53-1.5H17.4V4.3c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.93 1.42-3.93 4.03v2.19H8.5v3h2.6V21h3.1Z" />
    </svg>
  )
}

const currentYear = new Date().getFullYear()

const collectiveLinks = navigation.filter((item) =>
  ['nosotros', 'transparencia', 'libro'].includes(item.id),
)

const participateLinks = navigation.filter((item) =>
  ['impacto', 'eventos', 'donar'].includes(item.id),
)

export function Footer() {
  const [legalText, setLegalText] = useState<LegalText | null>(null)

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-forest-800/40 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm font-display text-2xl italic leading-snug text-forest-100">
              “{site.slogan}.”
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-200/75">
              Colectivo ciudadano que promueve la regulación responsable, la
              educación y la colaboración institucional desde {site.founded}.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Papá Ganjah"
                className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-cream/40 hover:bg-white/5 hover:text-cream"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Papá Ganjah"
                className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-cream/40 hover:bg-white/5 hover:text-cream"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Correo de Papá Ganjah"
                className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-cream/40 hover:bg-white/5 hover:text-cream"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                Colectivo
              </h3>
              <ul className="mt-4 space-y-3">
                {collectiveLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="text-sm text-forest-100/75 transition-colors hover:text-cream"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                Participa
              </h3>
              <ul className="mt-4 space-y-3">
                {participateLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="text-sm text-forest-100/75 transition-colors hover:text-cream"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#afiliate"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-[#e8bb63]"
                  >
                    Afíliate
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-forest-300">
                Contacto
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-forest-100/75">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-forest-400" />
                  {site.city}
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-2 transition-colors hover:text-cream"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-forest-400" />
                    {site.email}
                  </a>
                </li>
                <li className="pt-2">
                  <ButtonLink href="#donar" variant="gold" size="sm">
                    <Heart className="size-4" />
                    Donar
                  </ButtonLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-start gap-3 rounded-2xl border border-cream/10 bg-white/[0.04] px-4 py-4 text-xs leading-relaxed text-forest-100/70">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest-300" />
          <p>
            Papá Ganjah A.C. opera en estricto apego al marco normativo local.
            No promueve, facilita ni participa en actividades ilícitas. Este
            sitio está dirigido a personas mayores de 18 años y su contenido es
            informativo, no sustituye asesoría legal o médica.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-cream/10 pt-7 text-xs text-forest-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Papá Ganjah A.C. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => setLegalText(privacyNotice)}
              className="transition-colors hover:text-cream"
            >
              Aviso de Privacidad
            </button>
            <button
              type="button"
              onClick={() => setLegalText(legalDisclaimer)}
              className="transition-colors hover:text-cream"
            >
              Deslinde Legal
            </button>
          </div>
        </div>
      </Container>

      <LegalTextModal text={legalText} onClose={() => setLegalText(null)} />
    </footer>
  )
}
