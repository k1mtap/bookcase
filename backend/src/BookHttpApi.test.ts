import request from "supertest";
import { Book } from "@bookcase/book";
import { expect } from "chai";
import sinon from "sinon";
import { BookHttpApi } from "./BookHttpApi";
import { Repository } from "./Repository";
import { WebServer } from "./WebServer";

const commonErrorMessage = {
  error: "something went wrong, but don't worry, I catched it!",
};

describe("BookHttpApi", () => {
  describe("post: /books", () => {
    it("should create a new book", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();

      expect(mockBookRepository.create).not.to.be.called;

      await request(server)
        .post("/api/books")
        .send({ data: "irrelevant" })
        .expect(200);

      expect(mockBookRepository.create).to.be.called;
    });

    it("should use the given book parameters", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      const expectedBookParameters = {
        title: "title",
        author: "author",
        description: "description",
      };

      await request(server)
        .post("/api/books")
        .send(expectedBookParameters)
        .expect(200);

      expect(mockBookRepository.create).to.be.calledWith(
        expectedBookParameters
      );
    });

    it("should response with a newly created book", async () => {
      const title = "title";
      const author = "author";
      const description = "description";

      const input = {
        title,
        author,
        description,
      };
      const expectedBook: Book = createBook({ title, author, description });
      const { server, mockBookRepository } = setupTestEnvironment({
        book: expectedBook,
      });
      (mockBookRepository.create as sinon.SinonStub).resolves(expectedBook);

      const response = await request(server)
        .post("/api/books")
        .send(input)
        .expect(200);

      expect(response.body).to.deep.equal(expectedBook);
    });

    it("should response with an error message when creating a book fails", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      (mockBookRepository.create as sinon.SinonStub).throws();
      const response = await request(server)
        .post("/api/books")
        .send({ data: "irrelevant" })
        .expect(400);

      expect(response.body).to.deep.equal(commonErrorMessage);
    });
  });

  describe("get: /books", () => {
    it("should fetch all books", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();

      expect(mockBookRepository.getAll).not.to.be.called;

      await request(server).get("/api/books").expect(200);

      expect(mockBookRepository.getAll).to.be.called;
    });

    it("should return the expected books", async () => {
      const expectedBooks = [createBook()];
      const { server } = setupTestEnvironment({
        books: expectedBooks,
      });

      const response = await request(server).get("/api/books").expect(200);

      expect(response.body).to.deep.equal(expectedBooks);
    });

    it("should response with an error message when fetching books fails", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      (mockBookRepository.getAll as sinon.SinonStub).throws();

      const response = await request(server).get("/api/books").expect(400);

      expect(response.body).to.deep.equal(commonErrorMessage);
    });
  });

  describe("put: /books/bookId", () => {
    it("should update the given book", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      const id = "bookId";
      const expectedBook = createBook({ id });

      expect(mockBookRepository.update).not.to.be.called;

      await request(server)
        .put(`/api/books/${id}`)
        .send(expectedBook)
        .expect(200);

      expect(mockBookRepository.update).to.be.calledWith(expectedBook);
    });

    it("should response with an error message when updating a book fails", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      (mockBookRepository.update as sinon.SinonStub).throws();
      const response = await request(server)
        .put("/api/books/1")
        .send({ data: "irrelevant" })
        .expect(400);

      expect(response.body).to.deep.equal(commonErrorMessage);
    });
  });

  describe("delete: /books/bookId", () => {
    it("should delete the given book", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      const expectedId = "bookId";

      expect(mockBookRepository.delete).not.to.be.called;

      await request(server).delete(`/api/books/${expectedId}`).expect(200);

      expect(mockBookRepository.delete).to.be.calledWith(expectedId);
    });

    it("should response with an error message when deleting a book fails", async () => {
      const { server, mockBookRepository } = setupTestEnvironment();
      (mockBookRepository.delete as sinon.SinonStub).throws();
      const response = await request(server).delete("/api/books/1").expect(400);

      expect(response.body).to.deep.equal(commonErrorMessage);
    });
  });
});

interface Options {
  books?: Book[];
  book?: Book;
}

const setupTestEnvironment = (options: Options = {}) => {
  const webServer = new WebServer(3000);
  const mockBookRepository = createMockBookRepository({
    books: options.books,
    book: options.book,
  });
  const bookHttpApi = new BookHttpApi(mockBookRepository);
  webServer.registerRoute("/books", bookHttpApi.getRouter());
  const server = webServer.getHttpServer();

  return {
    server,
    mockBookRepository,
  };
};

interface MockBookRepositoryOptions {
  books?: Book[];
  book?: Book;
}
const createMockBookRepository = (
  options: MockBookRepositoryOptions
): Repository<Book> => ({
  getAll: sinon.stub().resolves(options.books ?? [createBook()]),
  create: sinon.stub().resolves(options.book ?? createBook()),
  update: sinon.stub(),
  delete: sinon.stub(),
});

interface BookOptions {
  id?: string;
  title?: string;
  author?: string;
  description?: string;
}

const createBook = (options: BookOptions = {}): Book => ({
  bookId: options.id ?? "1",
  title: options.title ?? "title",
  author: options.author ?? "author",
  description: options.description ?? "description",
});
