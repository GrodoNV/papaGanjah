import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { formRateLimiter } from '../../common/middlewares/rate-limit'
import { validateBody, validateQuery } from '../../common/middlewares/validate'
import type { AffiliatesController } from './affiliates.controller'
import { CreateAffiliateRequestDto } from './dto/create-affiliate-request.dto'
import { ListAffiliatesQueryDto } from './dto/list-affiliates-query.dto'
import { UpdateAffiliateStatusDto } from './dto/update-affiliate-status.dto'

export const createAffiliatesRouter = (controller: AffiliatesController): Router => {
  const router = Router()
  router.post(
    '/',
    formRateLimiter,
    validateBody(CreateAffiliateRequestDto),
    asyncHandler(controller.create),
  )
  return router
}

export const createAdminAffiliatesRouter = (
  controller: AffiliatesController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.get('/', validateQuery(ListAffiliatesQueryDto), asyncHandler(controller.list))
  router.patch(
    '/:id/status',
    validateBody(UpdateAffiliateStatusDto),
    asyncHandler(controller.updateStatus),
  )
  return router
}
