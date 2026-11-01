import 'reflect-metadata'
import type { Server } from 'node:http'
import { createApp } from './app'
import { AppDataSource } from './config/data-source'
import { env } from './config/env'
import { logger } from './common/utils/logger'

const start = async (): Promise<void> => {
  await AppDataSource.initialize()
  logger.info('Conexión a PostgreSQL establecida')

  if (env.DB_MIGRATIONS_RUN) {
    const migrations = await AppDataSource.runMigrations()
    logger.info(`Migraciones ejecutadas: ${migrations.length}`)
  }

  const app = createApp(AppDataSource)
  const server: Server = app.listen(env.PORT, () => {
    logger.info(`API Papá Ganjah disponible en ${env.PUBLIC_BASE_URL}`)
  })

  const shutdown = (signal: string): void => {
    logger.info(`Recibida señal ${signal}. Cerrando el servidor...`)

    const timeout = setTimeout(() => {
      logger.error('El cierre ordenado excedió el tiempo límite')
      process.exit(1)
    }, 10_000)
    timeout.unref()

    server.close(() => {
      void AppDataSource.destroy()
        .then(() => {
          clearTimeout(timeout)
          process.exit(0)
        })
        .catch((error) => {
          logger.error('Error al cerrar la conexión con la base de datos', error)
          process.exit(1)
        })
    })
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

process.on('unhandledRejection', (reason) => {
  logger.error('Promesa rechazada sin manejar', reason)
})

process.on('uncaughtException', (error) => {
  logger.error('Excepción no capturada', error)
  process.exit(1)
})

start().catch((error) => {
  logger.error('No fue posible iniciar la API', error)
  process.exit(1)
})
