import type { Repository } from 'typeorm'
import { NotFoundError } from '../../common/errors/app-error'
import type { CreateDocumentDto } from './dto/create-document.dto'
import type { ListDocumentsQueryDto } from './dto/list-documents-query.dto'
import type { UpdateDocumentDto } from './dto/update-document.dto'
import type { Document } from './entities/document.entity'

export class DocumentsService {
  constructor(private readonly documentRepository: Repository<Document>) {}

  async list(filters: ListDocumentsQueryDto = {}): Promise<Document[]> {
    const query = this.documentRepository
      .createQueryBuilder('document')
      .orderBy('document.sealDate', 'DESC')
      .addOrderBy('document.createdAt', 'DESC')

    if (filters.category) {
      query.andWhere('document.category = :category', { category: filters.category })
    }

    if (filters.q?.trim()) {
      query.andWhere(
        '(document.title ILIKE :search OR document.description ILIKE :search OR document.officialEntity ILIKE :search)',
        { search: `%${filters.q.trim()}%` },
      )
    }

    return query.getMany()
  }

  async getById(id: string): Promise<Document> {
    const document = await this.documentRepository.findOneBy({ id })
    if (!document) {
      throw new NotFoundError('Documento no encontrado')
    }
    return document
  }

  async create(dto: CreateDocumentDto): Promise<Document> {
    const document = this.documentRepository.create(dto)
    return this.documentRepository.save(document)
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<Document> {
    const document = await this.getById(id)
    this.documentRepository.merge(document, dto)
    return this.documentRepository.save(document)
  }

  async remove(id: string): Promise<void> {
    const result = await this.documentRepository.delete(id)
    if (!result.affected) {
      throw new NotFoundError('Documento no encontrado')
    }
  }
}
