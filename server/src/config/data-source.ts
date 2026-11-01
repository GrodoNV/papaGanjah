import path from 'node:path'
import { DataSource } from 'typeorm'
import { env } from './env'
import { Admin } from '../modules/auth/entities/admin.entity'
import { Book } from '../modules/book/entities/book.entity'
import { AffiliateRequest } from '../modules/affiliates/entities/affiliate-request.entity'
import { Document } from '../modules/documents/entities/document.entity'
import { DonationSetting } from '../modules/donations/entities/donation-setting.entity'
import { Event } from '../modules/events/entities/event.entity'
import { SocialProject } from '../modules/projects/entities/social-project.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  ssl: env.DB_SSL ? { rejectUnauthorized: false } : false,
  entities: [Admin, Document, Event, AffiliateRequest, SocialProject, Book, DonationSetting],
  migrations: [
    path.join(__dirname, '..', 'database', 'migrations', '*.ts'),
    path.join(__dirname, '..', 'database', 'migrations', '*.js'),
  ],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: env.DB_LOGGING ? ['error', 'warn', 'query'] : ['error'],
})
