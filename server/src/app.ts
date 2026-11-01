import path from 'node:path'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import type { DataSource } from 'typeorm'
import { env } from './config/env'
import { errorHandler, notFoundHandler } from './common/middlewares/error-handler'
import { Admin } from './modules/auth/entities/admin.entity'
import { AuthService } from './modules/auth/auth.service'
import { AuthController } from './modules/auth/auth.controller'
import { createAuthRouter } from './modules/auth/auth.routes'
import { createAuthenticate } from './modules/auth/middlewares/authenticate.middleware'
import { AffiliateRequest } from './modules/affiliates/entities/affiliate-request.entity'
import { AffiliatesService } from './modules/affiliates/affiliates.service'
import { AffiliatesController } from './modules/affiliates/affiliates.controller'
import {
  createAdminAffiliatesRouter,
  createAffiliatesRouter,
} from './modules/affiliates/affiliates.routes'
import { Book } from './modules/book/entities/book.entity'
import { BookService } from './modules/book/book.service'
import { BookController } from './modules/book/book.controller'
import { createAdminBookRouter, createBookRouter } from './modules/book/book.routes'
import { Document } from './modules/documents/entities/document.entity'
import { DocumentsService } from './modules/documents/documents.service'
import { DocumentsController } from './modules/documents/documents.controller'
import {
  createAdminDocumentsRouter,
  createDocumentsRouter,
} from './modules/documents/documents.routes'
import { DonationSetting } from './modules/donations/entities/donation-setting.entity'
import { DonationsService } from './modules/donations/donations.service'
import { DonationsController } from './modules/donations/donations.controller'
import {
  createAdminDonationsRouter,
  createDonationsRouter,
} from './modules/donations/donations.routes'
import { EmailService } from './modules/email/email.service'
import { Event } from './modules/events/entities/event.entity'
import { EventsService } from './modules/events/events.service'
import { EventsController } from './modules/events/events.controller'
import { createAdminEventsRouter, createEventsRouter } from './modules/events/events.routes'
import { SocialProject } from './modules/projects/entities/social-project.entity'
import { ProjectsService } from './modules/projects/projects.service'
import { ProjectsController } from './modules/projects/projects.controller'
import {
  createAdminProjectsRouter,
  createProjectsRouter,
} from './modules/projects/projects.routes'
import { UploadsController } from './modules/uploads/uploads.controller'
import { createAdminUploadsRouter } from './modules/uploads/uploads.routes'

export const createApp = (dataSource: DataSource): express.Express => {
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  )
  app.use(cors({ origin: env.CORS_ORIGINS }))
  app.use(compression())
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: false, limit: '1mb' }))

  if (env.NODE_ENV !== 'test') {
    app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
  }

  app.use(
    '/uploads',
    express.static(path.resolve(env.UPLOADS_DIR), {
      maxAge: env.NODE_ENV === 'production' ? '7d' : 0,
    }),
  )

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  const adminRepository = dataSource.getRepository(Admin)
  const authenticate = createAuthenticate(adminRepository)
  const emailService = new EmailService()

  const authController = new AuthController(new AuthService(adminRepository))
  const documentsController = new DocumentsController(
    new DocumentsService(dataSource.getRepository(Document)),
  )
  const eventsController = new EventsController(
    new EventsService(dataSource.getRepository(Event)),
  )
  const affiliatesController = new AffiliatesController(
    new AffiliatesService(dataSource.getRepository(AffiliateRequest), emailService),
  )
  const projectsController = new ProjectsController(
    new ProjectsService(dataSource.getRepository(SocialProject)),
  )
  const bookController = new BookController(
    new BookService(dataSource.getRepository(Book)),
  )
  const donationsController = new DonationsController(
    new DonationsService(dataSource.getRepository(DonationSetting), dataSource),
  )
  const uploadsController = new UploadsController()

  app.use('/api/auth', createAuthRouter(authController, authenticate))
  app.use('/api/documents', createDocumentsRouter(documentsController))
  app.use('/api/events', createEventsRouter(eventsController))
  app.use('/api/affiliates', createAffiliatesRouter(affiliatesController))
  app.use('/api/projects', createProjectsRouter(projectsController))
  app.use('/api/book', createBookRouter(bookController))
  app.use('/api/donations', createDonationsRouter(donationsController))

  app.use(
    '/api/admin/documents',
    createAdminDocumentsRouter(documentsController, authenticate),
  )
  app.use('/api/admin/events', createAdminEventsRouter(eventsController, authenticate))
  app.use(
    '/api/admin/affiliates',
    createAdminAffiliatesRouter(affiliatesController, authenticate),
  )
  app.use('/api/admin/projects', createAdminProjectsRouter(projectsController, authenticate))
  app.use('/api/admin/book', createAdminBookRouter(bookController, authenticate))
  app.use(
    '/api/admin/donations',
    createAdminDonationsRouter(donationsController, authenticate),
  )
  app.use('/api/admin/uploads', createAdminUploadsRouter(uploadsController, authenticate))

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
