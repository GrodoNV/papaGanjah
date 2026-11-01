import rateLimit from 'express-rate-limit'

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Demasiados intentos de acceso. Espera unos minutos antes de reintentar.',
    },
  },
})

export const formRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Recibimos demasiadas solicitudes desde esta dirección. Intenta más tarde.',
    },
  },
})
