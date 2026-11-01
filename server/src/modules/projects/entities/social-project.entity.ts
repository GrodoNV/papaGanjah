import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'social_projects' })
export class SocialProject {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 200 })
  title!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ name: 'before_image_url', type: 'varchar', length: 500 })
  beforeImageUrl!: string

  @Column({ name: 'after_image_url', type: 'varchar', length: 500 })
  afterImageUrl!: string

  @Column({ name: 'impact_metrics', type: 'varchar', length: 300 })
  impactMetrics!: string

  @Index('IDX_social_projects_project_date')
  @Column({ name: 'project_date', type: 'date' })
  projectDate!: string
}
