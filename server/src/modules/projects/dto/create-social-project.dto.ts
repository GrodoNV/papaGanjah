import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateSocialProjectDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title!: string

  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description!: string

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  beforeImageUrl!: string

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  afterImageUrl!: string

  @IsString()
  @MinLength(3)
  @MaxLength(300)
  impactMetrics!: string

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'projectDate debe tener formato YYYY-MM-DD' })
  projectDate!: string
}
