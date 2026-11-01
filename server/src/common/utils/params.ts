import { isUUID } from 'class-validator'
import type { Request } from 'express'
import { BadRequestError } from '../errors/app-error'

export const getUuidParam = (req: Request, name = 'id'): string => {
  const value = req.params[name]
  if (typeof value !== 'string' || !isUUID(value)) {
    throw new BadRequestError(`El parámetro "${name}" debe ser un UUID válido`)
  }
  return value
}
