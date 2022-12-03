import { Book } from "@bookcase/book";

export interface IManageBooks {
  getAll(): Book[];
}
