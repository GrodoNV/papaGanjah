import { IsEnum } from 'class-validator'
import { AffiliateStatus } from '../entities/affiliate-request.entity'

export class UpdateAffiliateStatusDto {
  @IsEnum(AffiliateStatus, { message: 'El estado de la solicitud no es válido' })
  status!: AffiliateStatus
}
