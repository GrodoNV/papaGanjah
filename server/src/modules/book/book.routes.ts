import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { validateBody } from '../../common/middlewares/validate'
import type { BookController } from './book.controller'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

export const createBookRouter = (controller: BookController): Router => {
  const router = Router()
  router.get('/preview', asyncHandler(controller.preview))
  return router
}

export const createAdminBookRouter = (
  controller: BookController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.get('/', asyncHandler(controller.list))
  router.post('/', validateBody(CreateBookDto), asyncHandler(controller.create))
  router.patch('/:id', validateBody(UpdateBookDto), asyncHandler(controller.update))
  return router
}
