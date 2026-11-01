import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { validateBody, validateQuery } from '../../common/middlewares/validate'
import type { EventsController } from './events.controller'
import { CreateEventDto } from './dto/create-event.dto'
import { ListEventsQueryDto } from './dto/list-events-query.dto'
import { UpdateEventDto } from './dto/update-event.dto'

export const createEventsRouter = (controller: EventsController): Router => {
  const router = Router()
  router.get('/', validateQuery(ListEventsQueryDto), asyncHandler(controller.list))
  return router
}

export const createAdminEventsRouter = (
  controller: EventsController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.get('/', validateQuery(ListEventsQueryDto), asyncHandler(controller.list))
  router.post('/', validateBody(CreateEventDto), asyncHandler(controller.create))
  router.patch('/:id', validateBody(UpdateEventDto), asyncHandler(controller.update))
  router.delete('/:id', asyncHandler(controller.remove))
  return router
}
