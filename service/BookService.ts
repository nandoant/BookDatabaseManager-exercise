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
        const existingBook = await this.getBook(book.getIsbn());

        if (existingBook) 
            throw new Error('Book already exists');

        return this.repository.insertBook(book);
    }

    public getAllBooks(): Promise<Book[]> {
        return this.repository.getAllBooks();
    }

    public getBook(isbn: string): Promise<Book | null> {
        this.validator.validateISBN(isbn);
        return this.repository.getBook(isbn);
    }

    public async updateBook(book: Book, isbn:string): Promise<Book> {
        this.validator.validateBook(book);
        const existingBook = await this.getBook(isbn);

        if (existingBook === null) 
            throw new Error('Book not found');
        
        return this.repository.updateBook(book, isbn);
    }

    public async deleteBook(isbn: string): Promise<void> {
        this.validator.validateISBN(isbn);
        const existingBook = await this.getBook(isbn);

        if (existingBook === null) 
            throw new Error('Book not found');

        return this.repository.deleteBook(isbn);
    }
}