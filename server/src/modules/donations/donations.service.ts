import type { DataSource, Repository } from 'typeorm'
import { NotFoundError } from '../../common/errors/app-error'
import type { CreateDonationSettingDto } from './dto/create-donation-setting.dto'
import type { UpdateDonationSettingDto } from './dto/update-donation-setting.dto'
import { DonationSetting } from './entities/donation-setting.entity'

export class DonationsService {
  constructor(
    private readonly donationRepository: Repository<DonationSetting>,
    private readonly dataSource: DataSource,
  ) {}

  async getActive(): Promise<DonationSetting> {
    const setting = await this.donationRepository.findOne({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    })

    if (!setting) {
      throw new NotFoundError('No hay una cuenta bancaria activa configurada')
    }

    return setting
  }

  async list(): Promise<DonationSetting[]> {
    return this.donationRepository.find({ order: { createdAt: 'DESC' } })
  }

  async create(dto: CreateDonationSettingDto): Promise<DonationSetting> {
    return this.dataSource.transaction(async (manager) => {
      const repository = manager.getRepository(DonationSetting)
      const isActive = dto.isActive ?? false

      if (isActive) {
        await this.deactivateAll(repository)
      }

      const setting = repository.create({ ...dto, isActive })
      return repository.save(setting)
    })
  }

  async update(id: string, dto: UpdateDonationSettingDto): Promise<DonationSetting> {
    return this.dataSource.transaction(async (manager) => {
      const repository = manager.getRepository(DonationSetting)
      const setting = await repository.findOneBy({ id })

      if (!setting) {
        throw new NotFoundError('Configuración de donativos no encontrada')
      }

      if (dto.isActive === true) {
        await this.deactivateAll(repository, id)
      }

      repository.merge(setting, dto)
      return repository.save(setting)
    })
  }

  async activate(id: string): Promise<DonationSetting> {
    return this.dataSource.transaction(async (manager) => {
      const repository = manager.getRepository(DonationSetting)
      const setting = await repository.findOneBy({ id })

      if (!setting) {
        throw new NotFoundError('Configuración de donativos no encontrada')
      }

      await this.deactivateAll(repository, id)
      setting.isActive = true
      return repository.save(setting)
    })
  }

  async remove(id: string): Promise<void> {
    const result = await this.donationRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundError('Configuración de donativos no encontrada')
    }
  }

  private async deactivateAll(
    repository: Repository<DonationSetting>,
    excludeId?: string,
  ): Promise<void> {
    const query = repository
      .createQueryBuilder()
      .update(DonationSetting)
      .set({ isActive: false })
      .where('is_active = true')

    if (excludeId) {
      query.andWhere('id <> :excludeId', { excludeId })
    }

    await query.execute()
  }
}
