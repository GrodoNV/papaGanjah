import { plainToInstance } from 'class-transformer'
import type { ClassConstructor } from 'class-transformer'
import { validate } from 'class-validator'
import type { RequestHandler } from 'express'
import type { ValidationError } from 'class-validator'
import { ValidationFailedError } from '../errors/app-error'
import { asyncHandler } from './async-handler'

const formatErrors = (errors: ValidationError[]): Record<string, string[]> => {
  const formatted: Record<string, string[]> = {}

  for (const error of errors) {
    if (error.constraints) {
      formatted[error.property] = Object.values(error.constraints)
    }
    if (error.children && error.children.length > 0) {
      const nested = formatErrors(error.children)
      for (const [key, messages] of Object.entries(nested)) {
        formatted[`${error.property}.${key}`] = messages
      }
    }
  }

  return formatted
}

const validateInstance = async (dto: ClassConstructor<object>, value: unknown): Promise<object> => {
  const instance = plainToInstance(dto, value)
  const errors = await validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new ValidationFailedError(formatErrors(errors))
  }

  return instance
}

export const validateBody = (dto: ClassConstructor<object>): RequestHandler =>
  asyncHandler(async (req, _res, next) => {
    req.body = await validateInstance(dto, req.body)
    next()
  })

export const validateQuery = (dto: ClassConstructor<object>): RequestHandler =>
  asyncHandler(async (req, _res, next) => {
    req.validatedQuery = await validateInstance(dto, req.query)
    next()
  })
