import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'donation_settings' })
export class DonationSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'bank_name', type: 'varchar', length: 120 })
  bankName!: string

  @Column({ name: 'account_holder', type: 'varchar', length: 180 })
  accountHolder!: string

  @Column({ name: 'account_number_or_clabe', type: 'varchar', length: 50 })
  accountNumberOrClabe!: string

  @Column({ name: 'qr_image_url', type: 'varchar', length: 500 })
  qrImageUrl!: string

  @Index('IDX_donation_settings_is_active')
  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive!: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date
}
