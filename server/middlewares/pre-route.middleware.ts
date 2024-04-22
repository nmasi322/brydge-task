import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

import type { Application } from "express";

const CORS_SETTINGS = {
  credentials: true,
  origin: ["http://localhost:3000", "https://brydge-task.vercel.app/"],
};

export default (app: Application) => {
  // enable CORS
  app.use(cors(CORS_SETTINGS));

  // Secure the app by setting various HTTP headers off.
  app.use(helmet({ contentSecurityPolicy: false }));

  // Logger
  app.use(morgan("common"));

  // Tell express to recognize the incoming Request Object as a JSON Object
  app.use(express.json({ limit: "5mb" }));

  // Express body parser
  app.use(express.urlencoded({ limit: "5mb", extended: true }));

  return app;
};
