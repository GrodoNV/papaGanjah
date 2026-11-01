import type { Request, Response } from 'express'
import { getUuidParam } from '../../common/utils/params'
import type { DonationsService } from './donations.service'
import type { CreateDonationSettingDto } from './dto/create-donation-setting.dto'
import type { UpdateDonationSettingDto } from './dto/update-donation-setting.dto'

export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  active = async (_req: Request, res: Response): Promise<void> => {
    const setting = await this.donationsService.getActive()
    res.json(setting)
  }

  list = async (_req: Request, res: Response): Promise<void> => {
    const settings = await this.donationsService.list()
    res.json(settings)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const setting = await this.donationsService.create(
      req.body as CreateDonationSettingDto,
    )
    res.status(201).json(setting)
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const setting = await this.donationsService.update(
      id,
      req.body as UpdateDonationSettingDto,
    )
    res.json(setting)
  }

  activate = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const setting = await this.donationsService.activate(id)
    res.json(setting)
  }

  remove = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    await this.donationsService.remove(id)
    res.status(204).send()
  }
}
