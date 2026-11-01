import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator'

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title?: string

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  synopsis?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  priceDigital?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pricePhysical?: number

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  previewPdfUrl?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  fullPdfUrl?: string
}
