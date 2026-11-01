import type { Request, Response } from 'express'
import { getUuidParam } from '../../common/utils/params'
import type { BookService } from './book.service'
import type { CreateBookDto } from './dto/create-book.dto'
import type { UpdateBookDto } from './dto/update-book.dto'

export class BookController {
  constructor(private readonly bookService: BookService) {}

  preview = async (_req: Request, res: Response): Promise<void> => {
    const book = await this.bookService.getPreview()
    res.json(book)
  }

  list = async (_req: Request, res: Response): Promise<void> => {
    const books = await this.bookService.listForAdmin()
    res.json(books)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const book = await this.bookService.create(req.body as CreateBookDto)
    res.status(201).json(book)
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id = getUuidParam(req)
    const book = await this.bookService.update(id, req.body as UpdateBookDto)
    res.json(book)
  }
}
