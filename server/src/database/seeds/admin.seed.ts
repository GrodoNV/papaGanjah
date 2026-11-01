import 'reflect-metadata'
import bcrypt from 'bcryptjs'
import { AppDataSource } from '../../config/data-source'
import { env } from '../../config/env'
import { Admin, AdminRole } from '../../modules/auth/entities/admin.entity'

const seed = async (): Promise<void> => {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error('Define ADMIN_EMAIL y ADMIN_PASSWORD para crear el administrador inicial')
  }

  if (env.ADMIN_PASSWORD.length < 8) {
    throw new Error('ADMIN_PASSWORD debe tener al menos 8 caracteres')
  }

  await AppDataSource.initialize()

  try {
    const repository = AppDataSource.getRepository(Admin)
    const email = env.ADMIN_EMAIL.trim().toLowerCase()
    const existing = await repository.findOneBy({ email })

    if (existing) {
      console.log(`El administrador ${email} ya existe. No se realizaron cambios.`)
      return
    }

    const admin = repository.create({
      name: env.ADMIN_NAME,
      email,
      passwordHash: await bcrypt.hash(env.ADMIN_PASSWORD, 12),
      role: AdminRole.ADMIN,
      isActive: true,
    })

    await repository.save(admin)
    console.log(`Administrador inicial creado: ${email}`)
  } finally {
    await AppDataSource.destroy()
  }
}

seed().catch((error) => {
  console.error('No fue posible crear el administrador inicial:', error)
  process.exit(1)
})
