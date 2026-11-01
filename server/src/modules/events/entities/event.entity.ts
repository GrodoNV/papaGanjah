import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { decimalTransformer } from '../../../common/utils/transformer'

@Entity({ name: 'events' })
@Unique('UQ_events_slug', ['slug'])
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 200 })
  title!: string

  @Column({ type: 'varchar', length: 180 })
  slug!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'varchar', length: 250 })
  location!: string

  @Column({ name: 'is_free', type: 'boolean', default: true })
  isFree!: boolean

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: decimalTransformer,
  })
  price!: number | null

  @Index('IDX_events_event_date')
  @Column({ name: 'event_date', type: 'timestamptz' })
  eventDate!: Date

  @Column({ type: 'integer' })
  capacity!: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date
}
