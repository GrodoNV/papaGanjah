import 'dotenv/config'
import { z } from 'zod'

const booleanString = z.preprocess((value) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.toLowerCase() === 'true'
  return value
}, z.boolean())

const optionalString = z.preprocess(
  (value) => (value === '' || value === null || value === undefined ? undefined : value),
  z.string().min(1).optional(),
)

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .min(1)
    .default('postgresql://postgres:postgres@localhost:5432/papaganjah'),
  DB_SSL: booleanString.default(false),
  DB_LOGGING: booleanString.default(false),
  DB_MIGRATIONS_RUN: booleanString.default(false),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().min(1).default('8h'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  PUBLIC_BASE_URL: z.string().url().default('http://localhost:4000'),
  UPLOADS_DIR: z.string().min(1).default('uploads'),
  UPLOAD_MAX_MB: z.coerce.number().positive().default(20),
  MAIL_FROM: z.string().min(1).default('Papá Ganjah <no-reply@papaganjah.org>'),
  CONTACT_EMAIL: z.string().email().default('contacto@papaganjah.org'),
  RESEND_API_KEY: optionalString,
  SMTP_HOST: optionalString,
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: booleanString.default(false),
  SMTP_USER: optionalString,
  SMTP_PASS: optionalString,
  ADMIN_NAME: z.string().min(1).default('Administración Papá Ganjah'),
  ADMIN_EMAIL: optionalString,
  ADMIN_PASSWORD: optionalString,
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const details = parsed.error.flatten().fieldErrors
  console.error('Configuración de entorno inválida:', details)
  process.exit(1)
}

export const env = {
  ...parsed.data,
  CORS_ORIGINS: parsed.data.CORS_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  PUBLIC_BASE_URL: parsed.data.PUBLIC_BASE_URL.replace(/\/+$/, ''),
}

export type Env = typeof env
