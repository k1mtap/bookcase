import "express-async-errors";
import { Book } from "@bookcase/book";
import express, { Request, Response, Router } from "express";
import { Send } from "express-serve-static-core";
import { HttpApi } from "./HttpApi";
import { Repository } from "./Repository";

interface TypedResponse<T> extends Response {
  json: Send<T, this>;
}

interface TypedRequest<T> extends Request {
  body: T;
}

export class BookHttpApi implements HttpApi {
  private router: Router;
  private bookRepository: Repository<Book>;

  constructor(bookRepository: Repository<Book>) {
    this.router = express.Router();
    this.bookRepository = bookRepository;
    this.registerRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private registerRoutes() {
    this.router.get("/", async (_req: Request, res: TypedResponse<Book[]>) => {
      const books = await this.bookRepository.getAll();

      res.status(200).json(books);
    });

    this.router.post(
      "/",
      async (req: TypedRequest<Omit<Book, "id">>, res: TypedResponse<Book>) => {
        const bookParams = req.body;
        const newBook = await this.bookRepository.create(bookParams);

        res.status(200).json(newBook);
      }
    );

    this.router.put("/:id", async (req: TypedRequest<Book>, res: Response) => {
      const updatedBook = req.body;

      await this.bookRepository.update(updatedBook);

      res.status(200).end();
    });

    this.router.delete(
      "/:id",
      async (req: TypedRequest<Book>, res: Response) => {
        const bookToBeDeleted = req.body;

        await this.bookRepository.delete(bookToBeDeleted);

        res.status(200).end();
      }
    );
  }
}
