import type { Request, Response } from 'express'
import { UnauthorizedError } from '../../common/errors/app-error'
import type { LoginDto } from './dto/login.dto'
import type { AuthService } from './auth.service'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body as LoginDto)
    res.json(result)
  }

  me = async (req: Request, res: Response): Promise<void> => {
    if (!req.admin) {
      throw new UnauthorizedError()
    }
    const admin = await this.authService.getById(req.admin.id)
    res.json({ admin })
  }
}
