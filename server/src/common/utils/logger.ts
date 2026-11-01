type LogLevel = 'info' | 'warn' | 'error' | 'debug'

const write = (level: LogLevel, message: string, meta?: unknown): void => {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`
  if (meta === undefined) {
    console[level](line)
    return
  }
  console[level](line, meta)
}

export const logger = {
  info: (message: string, meta?: unknown) => write('info', message, meta),
  warn: (message: string, meta?: unknown) => write('warn', message, meta),
  error: (message: string, meta?: unknown) => write('error', message, meta),
  debug: (message: string, meta?: unknown) => write('debug', message, meta),
}
