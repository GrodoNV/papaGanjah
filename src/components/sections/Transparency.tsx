import { Download, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { annualReport, documents } from '@/data/documents'
import type { LegalDocument } from '@/types'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DocumentCard } from '@/components/transparency/DocumentCard'
import { DocumentViewerModal } from '@/components/transparency/DocumentViewerModal'

export function Transparency() {
  const [selected, setSelected] = useState<LegalDocument | null>(null)

  return (
    <Section id="transparencia" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Transparencia y gestión legal"
          title={
            <>
              Documentos que respaldan{' '}
              <span className="font-display font-medium italic text-forest-600">
                cada paso
              </span>
              .
            </>
          }
          description="Convenios, oficios, actas y reconocimientos emitidos por autoridades. Publicamos los documentos completos para que cualquier persona pueda consultar, descargar y verificar nuestro trabajo."
          action={
            <ButtonLink
              href={annualReport.file}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="md"
            >
              <Download className="size-4" />
              {annualReport.title}
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onOpen={setSelected}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-forest-200/70 bg-forest-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-forest-900">
                Transparencia con nombre y referencia
              </p>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-forest-800/75">
                Cada documento incluye dependencia, fecha y número de oficio.
                Si necesitas una versión accesible o detectas una
                inconsistencia, escríbenos y lo atendemos.
              </p>
            </div>
          </div>
          <a
            href="mailto:transparencia@papaganjah.org"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-forest-800 shadow-sm transition-colors hover:bg-forest-700 hover:text-cream"
          >
            <Mail className="size-4" />
            transparencia@papaganjah.org
          </a>
        </div>
      </Container>

      <DocumentViewerModal
        document={selected}
        onClose={() => setSelected(null)}
      />
    </Section>
  )
}
