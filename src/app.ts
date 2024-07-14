import express from "express";
import { deleteBook, getAllBooks, getBook, insertBook, updateBook } from "./controller/BookController";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

function logInfo(){
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}


app.post("/books", insertBook);
app.get("/books", getAllBooks);
app.get("/books/:isbn", getBook);
app.put("/books/:isbn", updateBook);
app.delete("/books/:isbn", deleteBook);

app.listen(PORT, logInfo);

