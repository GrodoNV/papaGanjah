import type { Request, Response } from 'express'
import { BadRequestError } from '../../common/errors/app-error'
import { env } from '../../config/env'

export class UploadsController {
  upload = (req: Request, res: Response): void => {
    if (!req.file) {
      throw new BadRequestError('Adjunta un archivo en el campo "file"')
    }

    res.status(201).json({
      url: `${env.PUBLIC_BASE_URL}/uploads/${req.file.filename}`,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    })
  }
}
