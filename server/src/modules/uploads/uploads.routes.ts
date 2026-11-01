import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { Router } from 'express'
import type { RequestHandler } from 'express'
import multer from 'multer'
import { BadRequestError } from '../../common/errors/app-error'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { env } from '../../config/env'
import type { UploadsController } from './uploads.controller'

const uploadsRoot = path.resolve(env.UPLOADS_DIR)
fs.mkdirSync(uploadsRoot, { recursive: true })

const extensionsByMimeType: Record<string, string> = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadsRoot)
  },
  filename: (_req, file, callback) => {
    const extension = extensionsByMimeType[file.mimetype] ?? ''
    callback(null, `${randomUUID()}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: env.UPLOAD_MAX_MB * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!extensionsByMimeType[file.mimetype]) {
      callback(
        new BadRequestError(
          'Tipo de archivo no permitido. Solo se aceptan PDF, JPG, PNG y WEBP',
        ),
      )
      return
    }
    callback(null, true)
  },
})

export const createAdminUploadsRouter = (
  controller: UploadsController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.post('/', upload.single('file'), asyncHandler(controller.upload))
  return router
}
