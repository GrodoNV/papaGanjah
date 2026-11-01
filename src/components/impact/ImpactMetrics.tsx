import {
  Handshake,
  Recycle,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { impactMetrics } from '@/data/impact'
import type { ImpactMetric } from '@/types'

const icons: Record<ImpactMetric['icon'], LucideIcon> = {
  trees: Trees,
  users: Users,
  recycle: Recycle,
  handshake: Handshake,
}

export function ImpactMetrics() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-card lg:grid-cols-4">
      {impactMetrics.map((metric) => {
        const Icon = icons[metric.icon]
        return (
          <div key={metric.label} className="bg-white p-5 sm:p-6">
            <span className="grid size-10 place-items-center rounded-2xl bg-sage text-forest-700">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {metric.value}
            </p>
            <p className="mt-1.5 text-xs font-bold leading-snug text-forest-800">
              {metric.label}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
              {metric.detail}
            </p>
          </div>
        )
      })}
    </div>
  )
}
