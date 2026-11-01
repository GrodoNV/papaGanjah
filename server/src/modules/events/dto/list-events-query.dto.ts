import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class ListEventsQueryDto {
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  includePast?: boolean
}
