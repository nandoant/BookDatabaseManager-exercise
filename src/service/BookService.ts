import { Book } from "../model/Book";
import { BookRepository } from "../repository/BookRepository";
import { BookValidator } from "../utils/BookValidator";

export class BookService {
    private repository: BookRepository;
    private validator: BookValidator;

    constructor(repository = new BookRepository(), validator = new BookValidator()) {
        this.repository = repository;
        this.validator = validator;
        this.repository.createTable();
    }

    public async insertBook(book: Book): Promise<Book> {
        this.validator.validateBook(book);
        await this.verifyUniqueISBN(book.getIsbn());

        return this.repository.insertBook(book);
    }

    public async updateBook(book: Book): Promise<Book> {
        this.validator.validateBook(book);
        const existingBook = await this.verifyBookExistsById(book.getId());

        // Verifica se o ISBN mudou e, se mudou, verifica se o novo ISBN é único
        if (book.getIsbn() !== existingBook.getIsbn()) {
            await this.verifyUniqueISBN(book.getIsbn());
        }

        return this.repository.updateBook(book);
    }

    public async deleteBook(id: number): Promise<void> {
        this.validator.validadeID(id);
        await this.verifyBookExistsById(id);

        return this.repository.deleteBook(id);
    }

    public getAllBooks(): Promise<Book[]> {
        return this.repository.getAllBooks();
    }

    public getBookById(id: number): Promise<Book | null> {
        this.validator.validadeID(id);
        return this.repository.getBookById(id);
    }

    private async getBookByISBN(isbn: string): Promise<Book | null> {
        this.validator.validateISBN(isbn);
        return this.repository.getBook(isbn);
    }

    private async verifyUniqueISBN(isbn: string): Promise<void> {
        const book = await this.getBookByISBN(isbn);
        if (book !== null) {
            throw new Error('Book already exists with this ISBN');
        }
    }

    private async verifyBookExistsById(id: number): Promise<Book> {
        const book = await this.getBookById(id);
        if (book === null) {
            throw new Error('Book not found');
        }
        return book;
    }
}
