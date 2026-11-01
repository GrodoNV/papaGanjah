import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { validateBody } from '../../common/middlewares/validate'
import type { ProjectsController } from './projects.controller'
import { CreateSocialProjectDto } from './dto/create-social-project.dto'
import { UpdateSocialProjectDto } from './dto/update-social-project.dto'

export const createProjectsRouter = (controller: ProjectsController): Router => {
  const router = Router()
  router.get('/', asyncHandler(controller.list))
  return router
}

export const createAdminProjectsRouter = (
  controller: ProjectsController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.get('/', asyncHandler(controller.list))
  router.post('/', validateBody(CreateSocialProjectDto), asyncHandler(controller.create))
  router.patch('/:id', validateBody(UpdateSocialProjectDto), asyncHandler(controller.update))
  router.delete('/:id', asyncHandler(controller.remove))
  return router
}
