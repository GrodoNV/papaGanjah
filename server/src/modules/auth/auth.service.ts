import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import type { Repository } from 'typeorm'
import { env } from '../../config/env'
import { UnauthorizedError } from '../../common/errors/app-error'
import type { LoginDto } from './dto/login.dto'
import { Admin, AdminRole } from './entities/admin.entity'

export interface PublicAdmin {
  id: string
  name: string
  email: string
  role: AdminRole
}

export interface LoginResult {
  token: string
  admin: PublicAdmin
}

export const toPublicAdmin = (admin: Admin): PublicAdmin => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
})

export class AuthService {
  constructor(private readonly adminRepository: Repository<Admin>) {}

  async login(dto: LoginDto): Promise<LoginResult> {
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .addSelect('admin.passwordHash')
      .where('LOWER(admin.email) = LOWER(:email)', { email: dto.email.trim() })
      .getOne()

    if (!admin || !admin.isActive) {
      throw new UnauthorizedError('Correo o contraseña incorrectos')
    }

    const passwordMatches = await bcrypt.compare(dto.password, admin.passwordHash)
    if (!passwordMatches) {
      throw new UnauthorizedError('Correo o contraseña incorrectos')
    }

    const token = jwt.sign(
      { email: admin.email, role: admin.role },
      env.JWT_SECRET,
      {
        subject: admin.id,
        expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
        algorithm: 'HS256',
      },
    )

    return { token, admin: toPublicAdmin(admin) }
  }

  async getById(id: string): Promise<PublicAdmin> {
    const admin = await this.adminRepository.findOne({ where: { id, isActive: true } })
    if (!admin) {
      throw new UnauthorizedError('La sesión ya no es válida')
    }
    return toPublicAdmin(admin)
  }
}
