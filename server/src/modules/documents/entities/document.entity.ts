import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

export enum DocumentCategory {
  LEGAL = 'LEGAL',
  OFICIO_GOBIERNO = 'OFICIO_GOBIERNO',
  INFORME = 'INFORME',
}

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 200 })
  title!: string

  @Column({ type: 'text' })
  description!: string

  @Index('IDX_documents_category')
  @Column({ type: 'enum', enum: DocumentCategory, enumName: 'document_category_enum' })
  category!: DocumentCategory

  @Column({ name: 'file_url', type: 'varchar', length: 500 })
  fileUrl!: string

  @Column({ name: 'official_entity', type: 'varchar', length: 200 })
  officialEntity!: string

  @Column({ name: 'seal_date', type: 'date' })
  sealDate!: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date
}
