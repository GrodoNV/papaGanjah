import { useCallback, useEffect, useRef, useState } from 'react'

export function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  const measure = useCallback(() => {
    if (ref.current) setWidth(ref.current.getBoundingClientRect().width)
  }, [])

  useEffect(() => {
    measure()
    if (!ref.current) return

    const observer = new ResizeObserver(measure)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [measure])

  return { ref, width }
}
