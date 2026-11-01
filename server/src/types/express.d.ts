import type { AdminRole } from '../modules/auth/entities/admin.entity'

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string
        name: string
        email: string
        role: AdminRole
      }
      validatedQuery?: object
    }
  }
}

export {}
