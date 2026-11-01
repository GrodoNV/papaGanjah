import { ScrollText, ShieldCheck } from 'lucide-react'
import type { LegalText } from '@/types'
import { Modal } from '@/components/ui/Modal'

type LegalTextModalProps = {
  text: LegalText | null
  onClose: () => void
}

export function LegalTextModal({ text, onClose }: LegalTextModalProps) {
  return (
    <Modal
      open={Boolean(text)}
      onClose={onClose}
      title={text?.title ?? ''}
      description={text?.updatedAt}
      icon={<ScrollText className="size-5" />}
      size="lg"
      footer={
        <div className="flex items-start gap-3 text-xs leading-relaxed text-slate-500">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest-600" />
          <p>
            Documento informativo del colectivo. Para solicitudes formales
            escribe a contacto@papaganjah.org indicando el asunto y tu
            solicitud.
          </p>
        </div>
      }
    >
      {text && (
        <div className="space-y-7">
          <p className="rounded-2xl bg-sage/60 px-4 py-4 text-sm leading-relaxed text-forest-900">
            {text.intro}
          </p>
          {text.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-forest-800">
                {section.heading}
              </h3>
              <div className="mt-2 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Modal>
  )
}
