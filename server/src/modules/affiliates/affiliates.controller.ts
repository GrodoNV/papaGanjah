import type { Request, Response } from 'express'
import { getUuidParam } from '../../common/utils/params'
import type { AffiliatesService } from './affiliates.service'
import type { CreateAffiliateRequestDto } from './dto/create-affiliate-request.dto'
import type { ListAffiliatesQueryDto } from './dto/list-affiliates-query.dto'
import type { UpdateAffiliateStatusDto } from './dto/update-affiliate-status.dto'

export class AffiliatesController {
  constructor(private readonly affiliatesService: AffiliatesService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const request = await this.affiliatesService.create(req.body as CreateAffiliateRequestDto)
    res.status(201).json({
      message: 'Recibimos tu solicitud. Te contactaremos pronto.',
      request,
    })
  }

  list = async (req: Request, res: Response): Promise<void> => {
    const filters = (req.validatedQuery ?? {}) as ListAffiliatesQueryDto
    const requests = await this.affiliatesService.list(filters)
    res.json(requests)
  }

  updateStatus = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const request = await this.affiliatesService.updateStatus(
      id,
      req.body as UpdateAffiliateStatusDto,
    )
    res.json(request)
  }
}
