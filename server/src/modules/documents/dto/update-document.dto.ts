import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { DocumentCategory } from '../entities/document.entity'

export class UpdateDocumentDto {
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
  @IsEnum(DocumentCategory, { message: 'La categoría del documento no es válida' })
  category?: DocumentCategory

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  fileUrl?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  officialEntity?: string

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'sealDate debe tener formato YYYY-MM-DD' })
  sealDate?: string
}
