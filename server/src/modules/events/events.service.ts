import type { Repository } from 'typeorm'
import { BadRequestError, NotFoundError } from '../../common/errors/app-error'
import { slugify } from '../../common/utils/slug'
import type { CreateEventDto } from './dto/create-event.dto'
import type { ListEventsQueryDto } from './dto/list-events-query.dto'
import type { UpdateEventDto } from './dto/update-event.dto'
import type { Event } from './entities/event.entity'

export class EventsService {
  constructor(private readonly eventRepository: Repository<Event>) {}

  async list(filters: ListEventsQueryDto = {}): Promise<Event[]> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .orderBy('event.eventDate', 'ASC')
      .addOrderBy('event.createdAt', 'ASC')

    if (!filters.includePast) {
      query.where('event.eventDate >= NOW()')
    }

    return query.getMany()
  }

  async getById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id })
    if (!event) {
      throw new NotFoundError('Evento no encontrado')
    }
    return event
  }

  async create(dto: CreateEventDto): Promise<Event> {
    if (!dto.isFree && (dto.price === undefined || dto.price === null)) {
      throw new BadRequestError('Los eventos de pago deben incluir un precio')
    }

    const slug = await this.uniqueSlug(slugify(dto.slug ?? dto.title))
    const event = this.eventRepository.create({
      ...dto,
      slug,
      price: dto.isFree ? null : (dto.price ?? null),
    })

    return this.eventRepository.save(event)
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const event = await this.getById(id)
    const isFree = dto.isFree ?? event.isFree
    const price = dto.price !== undefined ? dto.price : event.price

    if (!isFree && (price === undefined || price === null)) {
      throw new BadRequestError('Los eventos de pago deben incluir un precio')
    }

    const changes: Partial<Event> = { ...dto }
    if (dto.slug) {
      changes.slug = await this.uniqueSlug(slugify(dto.slug), id)
    }
    changes.isFree = isFree
    changes.price = isFree ? null : price

    this.eventRepository.merge(event, changes)
    return this.eventRepository.save(event)
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundError('Evento no encontrado')
    }
  }

  private async uniqueSlug(base: string, excludeId?: string): Promise<string> {
    let candidate = base
    let suffix = 2

    while (await this.slugExists(candidate, excludeId)) {
      const trimmedBase = base.slice(0, 150).replace(/-+$/g, '')
      candidate = `${trimmedBase}-${suffix}`
      suffix += 1
    }

    return candidate
  }

  private async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .where('event.slug = :slug', { slug })

    if (excludeId) {
      query.andWhere('event.id <> :excludeId', { excludeId })
    }

    return (await query.getCount()) > 0
  }
}
