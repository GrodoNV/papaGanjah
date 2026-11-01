import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { validateBody, validateQuery } from '../../common/middlewares/validate'
import type { DocumentsController } from './documents.controller'
import { CreateDocumentDto } from './dto/create-document.dto'
import { ListDocumentsQueryDto } from './dto/list-documents-query.dto'
import { UpdateDocumentDto } from './dto/update-document.dto'

export const createDocumentsRouter = (controller: DocumentsController): Router => {
  const router = Router()
  router.get('/', validateQuery(ListDocumentsQueryDto), asyncHandler(controller.list))
  return router
}

export const createAdminDocumentsRouter = (
  controller: DocumentsController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.get('/', validateQuery(ListDocumentsQueryDto), asyncHandler(controller.list))
  router.post('/', validateBody(CreateDocumentDto), asyncHandler(controller.create))
  router.patch('/:id', validateBody(UpdateDocumentDto), asyncHandler(controller.update))
  router.delete('/:id', asyncHandler(controller.remove))
  return router
}
