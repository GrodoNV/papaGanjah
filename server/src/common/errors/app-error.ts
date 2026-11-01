export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = 'INTERNAL_ERROR',
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Solicitud inválida', details?: unknown) {
    super(message, 400, 'BAD_REQUEST', details)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acceso denegado') {
    super(message, 403, 'FORBIDDEN')
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404, 'NOT_FOUND')
  }
}

export class ConflictError extends AppError {
  constructor(message = 'El recurso ya existe') {
    super(message, 409, 'CONFLICT')
  }
}

export class ValidationFailedError extends AppError {
  constructor(details: Record<string, string[]>) {
    super('Los datos enviados no son válidos', 422, 'VALIDATION_ERROR', details)
  }
}
