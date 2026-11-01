import { IsEnum, IsOptional } from 'class-validator'
import { AffiliateStatus } from '../entities/affiliate-request.entity'

export class ListAffiliatesQueryDto {
  @IsOptional()
  @IsEnum(AffiliateStatus)
  status?: AffiliateStatus
}
