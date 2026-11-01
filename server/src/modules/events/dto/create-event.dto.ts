import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class CreateEventDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title!: string

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'El slug solo admite minúsculas, números y guiones' })
  @MaxLength(180)
  slug?: string

  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description!: string

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  location!: string

  @IsBoolean()
  isFree!: boolean

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number | null

  @Type(() => Date)
  @IsDate({ message: 'eventDate debe ser una fecha válida' })
  eventDate!: Date

  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity!: number
}
