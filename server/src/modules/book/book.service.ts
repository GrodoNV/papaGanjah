import type { Repository } from 'typeorm'
import { NotFoundError } from '../../common/errors/app-error'
import type { CreateBookDto } from './dto/create-book.dto'
import type { UpdateBookDto } from './dto/update-book.dto'
import type { Book } from './entities/book.entity'

export interface BookPreview {
  id: string
  title: string
  synopsis: string
  priceDigital: number
  pricePhysical: number
  previewPdfUrl: string
  previewPages: number
}

export class BookService {
  constructor(private readonly bookRepository: Repository<Book>) {}

  async getPreview(): Promise<BookPreview> {
    const [book] = await this.bookRepository.find({
      order: { createdAt: 'DESC' },
      take: 1,
    })

    if (!book) {
      throw new NotFoundError('El libro aún no está configurado')
    }

    return {
      id: book.id,
      title: book.title,
      synopsis: book.synopsis,
      priceDigital: book.priceDigital,
      pricePhysical: book.pricePhysical,
      previewPdfUrl: book.previewPdfUrl,
      previewPages: 5,
    }
  }

  async listForAdmin(): Promise<Book[]> {
    return this.bookRepository
      .createQueryBuilder('book')
      .addSelect('book.fullPdfUrl')
      .orderBy('book.createdAt', 'DESC')
      .getMany()
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(dto)
    return this.bookRepository.save(book)
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .addSelect('book.fullPdfUrl')
      .where('book.id = :id', { id })
      .getOne()

    if (!book) {
      throw new NotFoundError('Libro no encontrado')
    }

    this.bookRepository.merge(book, dto)
    return this.bookRepository.save(book)
  }
}
