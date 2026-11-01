import { MapPin } from 'lucide-react'
import type { CommunityEntry } from '@/types'
import { formatShortDate } from '@/lib/utils'

type CommunityEntryCardProps = {
  entry: CommunityEntry
}

export function CommunityEntryCard({ entry }: CommunityEntryCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={entry.image}
          alt={entry.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          width="1000"
          height="750"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-forest-950/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-forest-800 shadow-sm">
          {formatShortDate(entry.date)}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-forest-700/95 px-3 py-1.5 text-[10px] font-bold text-cream shadow-sm backdrop-blur">
          {entry.stat}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sage px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-forest-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-balance text-lg font-extrabold leading-snug tracking-tight text-ink">
          {entry.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <MapPin className="size-3.5 text-forest-500" />
          {entry.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {entry.summary}
        </p>
      </div>
    </article>
  )
}
