import cors from "cors";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { createServer, Server } from "http";

export class WebServer {
  private app: Express;
  private port: number;
  private server: Server;
  private routes: { path: string; router: Router }[];

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.server = createServer(this.app);
    this.routes = [];
  }

  getHttpServer() {
    this.prepare();
    return this.server;
  }

  registerRoute(path: string, router: Router) {
    this.routes.push({ path, router });
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.prepare();
      this.server.listen(this.port, (error?: Error) => {
        if (error) {
          console.error(error);
        }
        console.log(`Bookcase ready at http://localhost:${this.port}`);
        resolve();
      });
    });
  }

  private prepare(): void {
    this.app.use(cors());
    this.app.use(express.static("build"));
    this.app.use(express.json());
    for (const route of this.routes) {
      this.app.use(`/api${route.path}`, route.router);
    }
    this.app.use(this.unknownEndpoint);
    this.app.use(this.errorHandler);
  }

  private unknownEndpoint(_req: Request, res: Response) {
    res.status(404).send({ error: "unknown endpoint" });
  }

  private errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (!error) {
      return;
    }

    // For simplicity return this message for all errors
    return res.status(400).json({
      error: "something went wrong, but don't worry, I catched it!",
    });
  }
}
