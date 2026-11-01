import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { validateBody } from '../../common/middlewares/validate'
import type { DonationsController } from './donations.controller'
import { CreateDonationSettingDto } from './dto/create-donation-setting.dto'
import { UpdateDonationSettingDto } from './dto/update-donation-setting.dto'

export const createDonationsRouter = (controller: DonationsController): Router => {
  const router = Router()
  router.get('/active-qr', asyncHandler(controller.active))
  return router
}

export const createAdminDonationsRouter = (
  controller: DonationsController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()
  router.use(authenticate)
  router.get('/', asyncHandler(controller.list))
  router.post('/', validateBody(CreateDonationSettingDto), asyncHandler(controller.create))
  router.patch('/:id', validateBody(UpdateDonationSettingDto), asyncHandler(controller.update))
  router.patch('/:id/activate', asyncHandler(controller.activate))
  router.delete('/:id', asyncHandler(controller.remove))
  return router
}
