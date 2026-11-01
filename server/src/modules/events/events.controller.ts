import type { Request, Response } from 'express'
import { getUuidParam } from '../../common/utils/params'
import type { CreateEventDto } from './dto/create-event.dto'
import type { ListEventsQueryDto } from './dto/list-events-query.dto'
import type { UpdateEventDto } from './dto/update-event.dto'
import type { EventsService } from './events.service'

export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const filters = (req.validatedQuery ?? {}) as ListEventsQueryDto
    const events = await this.eventsService.list(filters)
    res.json(events)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const event = await this.eventsService.create(req.body as CreateEventDto)
    res.status(201).json(event)
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const event = await this.eventsService.update(id, req.body as UpdateEventDto)
    res.json(event)
  }

  remove = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    await this.eventsService.remove(id)
    res.status(204).send()
  }
}
