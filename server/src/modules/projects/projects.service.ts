import type { Repository } from 'typeorm'
import { NotFoundError } from '../../common/errors/app-error'
import type { CreateSocialProjectDto } from './dto/create-social-project.dto'
import type { UpdateSocialProjectDto } from './dto/update-social-project.dto'
import type { SocialProject } from './entities/social-project.entity'

export class ProjectsService {
  constructor(private readonly projectRepository: Repository<SocialProject>) {}

  async list(): Promise<SocialProject[]> {
    return this.projectRepository.find({
      order: { projectDate: 'DESC' },
    })
  }

  async getById(id: string): Promise<SocialProject> {
    const project = await this.projectRepository.findOneBy({ id })
    if (!project) {
      throw new NotFoundError('Proyecto social no encontrado')
    }
    return project
  }

  async create(dto: CreateSocialProjectDto): Promise<SocialProject> {
    const project = this.projectRepository.create(dto)
    return this.projectRepository.save(project)
  }

  async update(id: string, dto: UpdateSocialProjectDto): Promise<SocialProject> {
    const project = await this.getById(id)
    this.projectRepository.merge(project, dto)
    return this.projectRepository.save(project)
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundError('Proyecto social no encontrado')
    }
  }
}
