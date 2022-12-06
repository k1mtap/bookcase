import { Router } from "express";

export interface HttpApi {
  getRouter(): Router;
}
