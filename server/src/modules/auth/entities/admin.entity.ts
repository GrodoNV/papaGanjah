import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

export enum AdminRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

@Entity({ name: 'admin_users' })
@Unique('UQ_admin_users_email', ['email'])
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 150 })
  name!: string

  @Column({ type: 'varchar', length: 200 })
  email!: string

  @Column({ name: 'password_hash', type: 'varchar', length: 255, select: false })
  passwordHash!: string

  @Column({
    type: 'enum',
    enum: AdminRole,
    enumName: 'admin_role_enum',
    default: AdminRole.ADMIN,
  })
  role!: AdminRole

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date
}
