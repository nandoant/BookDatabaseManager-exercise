import { Book } from "../model/Book";

export class BookValidator {
    private static MAX_LENGTHS = {
        title: 255,
        author: 100,
        language: 50,
        publisher: 100
    };

    //** 
    //* ISBN_REGEX: Verifica se o input tem entre 10digitos ou 13digitos.
    //* Exemplo: 1234567890, que é o formato de ISBN.
    //** 
    private static ISBN_REGEX = /^(?:\d{10}|\d{13})$/;

    //** 
    //* DATA_REGEX: Verifica se o input tem extamente: "4digitos" + "-" + "2digitos" + "-" + "2digitos".
    //* Exemplo: 2022-01-01, que é o formato de data que o banco de dados aceita(americano).
    //** 
    private static DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

    public validateBook(book: Book): void {
        this.validateString(book.getTitle(), 'Title', BookValidator.MAX_LENGTHS.title);
        this.validateString(book.getAuthor(), 'Author', BookValidator.MAX_LENGTHS.author);
        this.validateString(book.getLanguage(), 'Language', BookValidator.MAX_LENGTHS.language);
        this.validateString(book.getPublisher(), 'Publisher', BookValidator.MAX_LENGTHS.publisher);
        this.validateDate(book.getPublishedDate());
        this.validateISBN(book.getIsbn());
        this.validatePages(book.getPages());
    }


    private validateString(value: string, fieldName: string, maxLength: number): void {
        if (typeof value !== 'string' || value.trim().length === 0) {
            throw new Error(`${fieldName} must be a non-empty string`);
        }
        if (value.length > maxLength) {
            throw new Error(`${fieldName} exceeds the maximum length of ${maxLength} characters`);
        }
    }

    private validateDate(date: string): void {
        if (!BookValidator.DATE_REGEX.test(date)) {
            throw new Error('Publication date must be in the format YYYY-MM-DD');
        }
        if (isNaN(new Date(date).getTime())) {
            throw new Error('Invalid publication date');
        }
    }

    public validateISBN(isbn: string): void {
        if (!BookValidator.ISBN_REGEX.test(isbn)) {
            throw new Error('ISBN must be 10 or 13 digits');
        }
    }

    private validatePages(pages: number): void {
        if (!Number.isInteger(pages) || pages <= 0 || pages > 10000) {
            throw new Error('Number of pages must be a positive integer not exceeding 10000');
        }
    }
}