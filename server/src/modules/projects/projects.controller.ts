import type { Request, Response } from 'express'
import { getUuidParam } from '../../common/utils/params'
import type { CreateSocialProjectDto } from './dto/create-social-project.dto'
import type { UpdateSocialProjectDto } from './dto/update-social-project.dto'
import type { ProjectsService } from './projects.service'

export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  list = async (_req: Request, res: Response): Promise<void> => {
    const projects = await this.projectsService.list()
    res.json(projects)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const project = await this.projectsService.create(req.body as CreateSocialProjectDto)
    res.status(201).json(project)
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const project = await this.projectsService.update(id, req.body as UpdateSocialProjectDto)
    res.json(project)
  }

  remove = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    await this.projectsService.remove(id)
    res.status(204).send()
  }
}
