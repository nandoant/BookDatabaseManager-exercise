import { executarComandoSQL } from "../database/mysql";
import { Book } from "../model/Book";

export class BookRepository {
    //**
    //* TABLE_NAME: Nome da tabela que será criada no banco de dados.
    //* exemplo: biblioteca.book, biblioteca é o nome do banco de dados e book é o nome da tabela.
    //** 
    private static TABLE_NAME = 'biblioteca.book';

    async createTable(): Promise<void> {
        const query = `
        CREATE TABLE IF NOT EXISTS ${BookRepository.TABLE_NAME} (
            title VARCHAR(255) NOT NULL,
            author VARCHAR(100) NOT NULL,
            publishedDate DATE NOT NULL,
            isbn VARCHAR(13) PRIMARY KEY,
            pages INT NOT NULL,
            language VARCHAR(50) NOT NULL,
            publisher VARCHAR(100) NOT NULL
        )`;

        try {
            await executarComandoSQL(query, []);
            console.log('Table created successfully');
        } catch (err) {
            console.error('Error creating table:', err);
            throw err;
        }
    }

    async insertBook(book: Book): Promise<Book> {
        const query = `
            INSERT INTO ${BookRepository.TABLE_NAME} 
            (title, author, publishedDate, isbn, pages, language, publisher) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

        try {
            await executarComandoSQL(query, [
                book.getTitle(), 
                book.getAuthor(), 
                book.getPublishedDate(), 
                book.getIsbn(), 
                book.getPages(), 
                book.getLanguage(), 
                book.getPublisher()
            ]);
            
            console.log('Book inserted successfully, ISBN:', book.getIsbn());
            return book;
        } catch (err) {
            console.error('Error inserting book:', err);
            throw err;
        }
    }

    async updateBook(book: Book, isbn:string): Promise<Book> {
        const query = `
            UPDATE ${BookRepository.TABLE_NAME} SET 
            title = ?, 
            author = ?, 
            publishedDate = ?, 
            pages = ?, 
            language = ?, 
            publisher = ? , 
            isbn = ?
            WHERE isbn = ?
            `;

        try {
            await executarComandoSQL(query, [
                book.getTitle(), 
                book.getAuthor(), 
                book.getPublishedDate(), 
                book.getPages(), 
                book.getLanguage(), 
                book.getPublisher(), 
                book.getIsbn(), 
                isbn
            ]);

            console.log('Book updated successfully, ISBN:', book.getIsbn());
            return book;
        } catch (err) {
            console.error(`Error updating book with ISBN ${book.getIsbn()}:`, err);
            throw err;
        }
    }

    async deleteBook(isbn: string): Promise<void> {
        const query = `DELETE FROM ${BookRepository.TABLE_NAME} WHERE isbn = ?`;

        try {
            await executarComandoSQL(query, [isbn]);
            console.log('Book deleted successfully, ISBN:', isbn);
        } catch (err) {
            console.error('Error deleting book:', err);
            throw err;
        }
    }

    async getBook(isbn: string): Promise<Book | null> {
        const query = `SELECT * FROM ${BookRepository.TABLE_NAME} WHERE isbn = ?`;

        try {
            const [result] = await executarComandoSQL(query, [isbn]);
            
            if (!result) {
                console.log('Book not found, ISBN:', isbn);
                return null;
            }

            console.log('Book found successfully, ISBN:', isbn);
            return new Book(
                result.title, 
                result.author, 
                this.sanitizeDate(result.publishedDate),
                result.isbn, 
                result.pages, 
                result.language, 
                result.publisher
            );
        } catch (err) {
            console.error('Error fetching book:', err);
            throw err;
        }
    }

    async getAllBooks(): Promise<Book[]>{
        const query = "SELECT * FROM biblioteca.book" ;

        try {
            const results = await executarComandoSQL(query, []);
            console.log('Books found successfully');

            return results.map((result:any) => new Book(
                result.title, 
                result.author, 
                this.sanitizeDate(result.publishedDate), 
                result.isbn, 
                result.pages, 
                result.language, 
                result.publisher
            ));
        } catch (err) {
            console.error('Error fetching books:', err);
            throw err;
        }
    }

    //**
    //* Serve para retirar a informação extra que o mysql coloca na data, deixando-a apenas no formato YYYY-MM-DD
    //* Exemplo: 2022-01-01T00:00:00.000Z -> 2022-01-01
    //**
    private sanitizeDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    
}