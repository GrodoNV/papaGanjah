import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

export enum AffiliateStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
}

@Entity({ name: 'affiliate_requests' })
export class AffiliateRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'full_name', type: 'varchar', length: 150 })
  fullName!: string

  @Column({ type: 'varchar', length: 200 })
  email!: string

  @Column({ type: 'varchar', length: 30 })
  phone!: string

  @Column({ type: 'varchar', length: 120 })
  city!: string

  @Column({ type: 'text' })
  motivation!: string

  @Index('IDX_affiliate_requests_status')
  @Column({
    type: 'enum',
    enum: AffiliateStatus,
    enumName: 'affiliate_status_enum',
    default: AffiliateStatus.PENDING,
  })
  status!: AffiliateStatus

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date
}
