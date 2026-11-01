import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import type { Repository } from 'typeorm'
import { env } from '../../../config/env'
import { UnauthorizedError } from '../../../common/errors/app-error'
import { Admin } from '../entities/admin.entity'

export const createAuthenticate =
  (adminRepository: Repository<Admin>): RequestHandler =>
  async (req, _res, next) => {
    try {
      const header = req.headers.authorization
      if (!header?.startsWith('Bearer ')) {
        throw new UnauthorizedError('Token de acceso requerido')
      }

      const token = header.slice('Bearer '.length).trim()
      if (!token) {
        throw new UnauthorizedError('Token de acceso requerido')
      }

      const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] })
      if (typeof payload === 'string' || typeof payload.sub !== 'string') {
        throw new UnauthorizedError('Token inválido')
      }

      const admin = await adminRepository.findOne({
        where: { id: payload.sub, isActive: true },
      })

      if (!admin) {
        throw new UnauthorizedError('La sesión ya no es válida')
      }

      req.admin = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }
      next()
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        next(error)
        return
      }
      if (error instanceof jwt.TokenExpiredError) {
        next(new UnauthorizedError('El token expiró'))
        return
      }
      if (error instanceof jwt.JsonWebTokenError) {
        next(new UnauthorizedError('Token inválido'))
        return
      }
      next(error)
    }
  }
