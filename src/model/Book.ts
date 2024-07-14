export class Book{
    private title: string;
    private author: string;
    private publishedDate: string;
    private isbn: string;
    private pages: number;
    private language:string;
    private publisher: string;

    constructor( title: string, author: string, publishedDate: string, isbn: string, pages: number, language:string, publisher: string){
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.pages = pages;
        this.language = language;
        this.publisher = publisher;
    }

    //getters
    getTitle(): string { return this.title; }
    getAuthor(): string { return this.author; }
    getPublishedDate(): string { return this.publishedDate; }
    getIsbn(): string { return this.isbn; }
    getPages(): number { return this.pages; }
    getLanguage(): string { return this.language; }
    getPublisher(): string { return this.publisher; }

    //setters
    setTitle(title: string): void { this.title = title; }
    setAuthor(author: string): void { this.author = author; }
    setPublishedDate(publishedDate: string): void { this.publishedDate = publishedDate; }
    setIsbn(isbn: string): void { this.isbn = isbn; }
    setPages(pages: number): void { this.pages = pages; }
    setLanguage(language: string): void { this.language = language; }
    setPublisher(publisher: string): void { this.publisher = publisher; }
}