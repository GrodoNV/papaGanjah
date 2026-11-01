import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class UpdateSocialProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title?: string

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  beforeImageUrl?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  afterImageUrl?: string

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  impactMetrics?: string

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'projectDate debe tener formato YYYY-MM-DD' })
  projectDate?: string
}
