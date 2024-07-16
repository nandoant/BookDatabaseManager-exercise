import { Book } from "../model/Book";
import { Validator } from "./Validator";

export class BookValidator extends Validator{
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


    public validateBook(book: Book): void {
        super.validateString(book.getTitle(), 'Title', BookValidator.MAX_LENGTHS.title);
        super.validateString(book.getAuthor(), 'Author', BookValidator.MAX_LENGTHS.author);
        super.validateString(book.getLanguage(), 'Language', BookValidator.MAX_LENGTHS.language);
        super.validateString(book.getPublisher(), 'Publisher', BookValidator.MAX_LENGTHS.publisher);
        super.validateDate(book.getPublishedDate());
        this.validateISBN(book.getIsbn());
        this.validatePages(book.getPages());
    }

    //Validações unicas do Book
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