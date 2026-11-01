import type { Repository } from 'typeorm'
import { NotFoundError } from '../../common/errors/app-error'
import type { EmailService } from '../email/email.service'
import type { CreateAffiliateRequestDto } from './dto/create-affiliate-request.dto'
import type { ListAffiliatesQueryDto } from './dto/list-affiliates-query.dto'
import type { UpdateAffiliateStatusDto } from './dto/update-affiliate-status.dto'
import { AffiliateRequest } from './entities/affiliate-request.entity'

export class AffiliatesService {
  constructor(
    private readonly affiliateRepository: Repository<AffiliateRequest>,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateAffiliateRequestDto): Promise<AffiliateRequest> {
    const request = this.affiliateRepository.create({
      ...dto,
      email: dto.email.trim().toLowerCase(),
    })

    const saved = await this.affiliateRepository.save(request)
    await this.emailService.sendAffiliateEmails(saved)
    return saved
  }

  async list(filters: ListAffiliatesQueryDto = {}): Promise<AffiliateRequest[]> {
    const query = this.affiliateRepository
      .createQueryBuilder('affiliate')
      .orderBy('affiliate.createdAt', 'DESC')

    if (filters.status) {
      query.where('affiliate.status = :status', { status: filters.status })
    }

    return query.getMany()
  }

  async updateStatus(id: string, dto: UpdateAffiliateStatusDto): Promise<AffiliateRequest> {
    const request = await this.affiliateRepository.findOneBy({ id })
    if (!request) {
      throw new NotFoundError('Solicitud de afiliación no encontrada')
    }

    request.status = dto.status
    return this.affiliateRepository.save(request)
  }
}
