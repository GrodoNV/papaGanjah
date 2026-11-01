import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLongDate(isoDate: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`))
}

export function formatShortDate(isoDate: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`))
}

export function getDateParts(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`)
  return {
    day: new Intl.DateTimeFormat('es-MX', { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat('es-MX', { month: 'short' })
      .format(date)
      .replace('.', '')
      .toUpperCase(),
    weekday: new Intl.DateTimeFormat('es-MX', { weekday: 'long' }).format(date),
  }
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}
