import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'
import { DocumentCategory } from '../entities/document.entity'

export class ListDocumentsQueryDto {
  @IsOptional()
  @IsEnum(DocumentCategory)
  category?: DocumentCategory

  @IsOptional()
  @IsString()
  @MaxLength(120)
  q?: string
}
