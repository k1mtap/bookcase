import { BookHttpApi } from "./BookHttpApi";
import { BookRepository } from "./BookRepository";
import { resolveEnvVariable } from "@bookcase/util";
import { WebServer } from "./WebServer";

const port = Number(resolveEnvVariable("PORT"));

const main = async () => {
  const bookRepository = new BookRepository();
  const bookHttpApi = new BookHttpApi(bookRepository);
  const webServer = new WebServer(port);
  webServer.registerRoute("/books", bookHttpApi.getRouter());

  await webServer.start();
};

main();
