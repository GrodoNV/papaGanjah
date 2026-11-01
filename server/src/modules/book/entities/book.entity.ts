import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { decimalTransformer } from '../../../common/utils/transformer'

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 200 })
  title!: string

  @Column({ type: 'text' })
  synopsis!: string

  @Column({
    name: 'price_digital',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  priceDigital!: number

  @Column({
    name: 'price_physical',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  pricePhysical!: number

  @Column({ name: 'preview_pdf_url', type: 'varchar', length: 500 })
  previewPdfUrl!: string

  @Column({ name: 'full_pdf_url', type: 'varchar', length: 500, select: false })
  fullPdfUrl!: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date
}
