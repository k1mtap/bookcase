import { resolveEnvVariable } from "@bookcase/util";
import { knexFile } from "../knexfile";
import { BookHttpApi } from "./BookHttpApi";
import { BookRepository } from "./BookRepository";
import { Database } from "./Database";
import { WebServer } from "./WebServer";

const port = Number(resolveEnvVariable("PORT"));

const main = async () => {
  const database = new Database(knexFile);
  await database.init();

  const bookRepository = new BookRepository();
  const bookHttpApi = new BookHttpApi(bookRepository);
  const webServer = new WebServer(port);
  webServer.registerRoute("/books", bookHttpApi.getRouter());

  await webServer.start();
};

main();
