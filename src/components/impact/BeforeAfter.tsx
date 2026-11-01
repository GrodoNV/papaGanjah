import { ChevronsLeftRight } from 'lucide-react'
import { useState } from 'react'
import { clamp } from '@/lib/utils'

type BeforeAfterProps = {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  alt?: string
}

export function BeforeAfter({
  before,
  after,
  beforeLabel = 'Antes',
  afterLabel = 'Después',
  alt = 'Comparación del antes y después del espacio rehabilitado',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(52)

  return (
    <div className="relative overflow-hidden rounded-3xl border border-forest-200/80 bg-slate-100 shadow-card focus-within:ring-2 focus-within:ring-forest-500 focus-within:ring-offset-2">
      <div className="relative aspect-[4/3] w-full select-none">
        <img
          src={after}
          alt={`${alt} — después`}
          className="absolute inset-0 size-full object-cover"
          width="1200"
          height="900"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <img
            src={before}
            alt={`${alt} — antes`}
            className="size-full object-cover"
            width="1200"
            height="900"
            draggable={false}
          />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-forest-950/65 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-cream backdrop-blur sm:left-4 sm:top-4">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-800 shadow-sm backdrop-blur sm:right-4 sm:top-4">
          {afterLabel}
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-cream shadow-[0_0_18px_rgba(15,23,42,0.45)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-cream bg-forest-700 text-cream shadow-lg">
            <ChevronsLeftRight className="size-5" />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label="Comparar el antes y el después"
          onChange={(event) =>
            setPosition(clamp(Number(event.target.value), 0, 100))
          }
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          style={{ touchAction: 'pan-y' }}
        />

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-forest-950/55 px-3 py-1.5 text-[10px] font-semibold text-cream backdrop-blur sm:bottom-4">
          Desliza para comparar
        </div>
      </div>
    </div>
  )
}
