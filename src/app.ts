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
app.get("/books/:id", getBook);
app.put("/books/:id", updateBook);
app.delete("/books/:id", deleteBook);

app.listen(PORT, logInfo);

