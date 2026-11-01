import { Type } from 'class-transformer'
import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator'

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title!: string

  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  synopsis!: string

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  priceDigital!: number

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pricePhysical!: number

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  previewPdfUrl!: string

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  fullPdfUrl!: string
}
