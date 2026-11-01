import type { Request, Response } from 'express'
import { getUuidParam } from '../../common/utils/params'
import type { CreateDocumentDto } from './dto/create-document.dto'
import type { ListDocumentsQueryDto } from './dto/list-documents-query.dto'
import type { UpdateDocumentDto } from './dto/update-document.dto'
import type { DocumentsService } from './documents.service'

export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const filters = (req.validatedQuery ?? {}) as ListDocumentsQueryDto
    const documents = await this.documentsService.list(filters)
    res.json(documents)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const document = await this.documentsService.create(req.body as CreateDocumentDto)
    res.status(201).json(document)
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const document = await this.documentsService.update(id, req.body as UpdateDocumentDto)
    res.json(document)
  }

  remove = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    await this.documentsService.remove(id)
    res.status(204).send()
  }
}
