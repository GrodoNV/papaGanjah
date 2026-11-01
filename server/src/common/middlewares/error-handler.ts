import type { ErrorRequestHandler, RequestHandler } from 'express'
import { MulterError } from 'multer'
import { QueryFailedError } from 'typeorm'
import { AppError } from '../errors/app-error'
import { logger } from '../utils/logger'

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    },
  })
}

interface DatabaseError {
  code?: string
  detail?: string
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details === undefined ? {} : { details: error.details }),
      },
    })
    return
  }

  if (error instanceof MulterError) {
    res.status(400).json({
      error: {
        code: 'UPLOAD_ERROR',
        message:
          error.code === 'LIMIT_FILE_SIZE'
            ? 'El archivo supera el tamaño máximo permitido'
            : 'No fue posible procesar el archivo',
      },
    })
    return
  }

  if (error instanceof QueryFailedError) {
    const driverError = error.driverError as DatabaseError
    if (driverError.code === '23505') {
      res.status(409).json({
        error: {
          code: 'CONFLICT',
          message: 'El recurso entra en conflicto con un registro existente',
        },
      })
      return
    }
    if (driverError.code === '23503') {
      res.status(409).json({
        error: {
          code: 'RELATION_CONFLICT',
          message: 'El recurso está relacionado con otros registros',
        },
      })
      return
    }
  }

  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'El cuerpo de la solicitud no contiene JSON válido',
      },
    })
    return
  }

  logger.error(`Error no controlado en ${req.method} ${req.originalUrl}`, error)
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Ocurrió un error interno. Intenta nuevamente más tarde.',
    },
  })
}
