import { Router } from 'express'
import type { RequestHandler } from 'express'
import { asyncHandler } from '../../common/middlewares/async-handler'
import { loginRateLimiter } from '../../common/middlewares/rate-limit'
import { validateBody } from '../../common/middlewares/validate'
import type { AuthController } from './auth.controller'
import { LoginDto } from './dto/login.dto'

export const createAuthRouter = (
  controller: AuthController,
  authenticate: RequestHandler,
): Router => {
  const router = Router()

  router.post('/login', loginRateLimiter, validateBody(LoginDto), asyncHandler(controller.login))
  router.get('/me', authenticate, asyncHandler(controller.me))

  return router
}
