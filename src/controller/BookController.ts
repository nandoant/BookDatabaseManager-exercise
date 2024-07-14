import { Request, Response } from "express";
import { BookService } from "../service/BookService";
import { Book } from "../model/Book";

const service = new BookService();

export async function insertBook(req: Request, res: Response) {
    try {
        const bookData = req.body;
        const book = new Book(
            bookData.title,
            bookData.author,
            bookData.publishedDate,
            bookData.isbn,
            bookData.pages,
            bookData.language,
            bookData.publisher
        );
        const insertedBook = await service.insertBook(book);
        res.status(201).json({ book: insertedBook });
    } catch (err: any) {
        if (err.message.includes("already exists")) {
            res.status(409).json({ message: "Book already exists" });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
}

export async function getAllBooks(req: Request, res: Response) {
    try {
        const books = await service.getAllBooks();
        res.status(200).json({ books });
    } catch (err: any) {
        res.status(500).json({ message: "Error fetching books", error: err.message });
    }
}

export async function getBook(req: Request, res: Response) {
    try {
        const book = await service.getBook(req.params.isbn);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ book });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export async function updateBook(req: Request, res: Response) {
    try {
        const bookData = req.body;
        const isbn = req.params.isbn;
        const book = new Book(
            bookData.title,
            bookData.author,
            bookData.publishedDate,
            bookData.isbn,
            bookData.pages,
            bookData.language,
            bookData.publisher
        );
        const updatedBook = await service.updateBook(book, isbn);
        res.status(200).json({ book: updatedBook });
    } catch (err: any) {
        if (err.message.includes("not found")) {
            res.status(404).json({ message: "BOOK NOT FOUND" });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
}

export async function deleteBook(req: Request, res: Response) {
    try {
        await service.deleteBook(req.params.isbn);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err: any) {
        if (err.message.includes("not found")) {
            res.status(404).json({ message: "BOOK NOT FOUND" });
        } else {
            res.status(500).json({ message: "Error deleting book", error: err.message });
        }
    }
}