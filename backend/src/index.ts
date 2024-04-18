import express, { Request, Response, NextFunction } from "express";
import http from "http";
import "express-async-errors";

const app = express();
const httpServer = http.createServer(app);

// Pre-route middlewares
import preRouteMiddleware from "./middlewares/pre-route.middleware";
preRouteMiddleware(app);

// routes
import routes from "./routes";
app.use(routes);

// Error middlewares
import response from "./utils/response";
app.use("*", (req: Request, res: Response) => {
  res.status(404).send(response("Invalid request", null, false));
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name == "CustomError") {
    res.status(error.status).send(response(error.message, null, false));
  } else res.status(500).send(response(error.message, null, false));
});

// Listen to server port
import { PORT } from "./config";
httpServer.listen(PORT, async () => {
  console.log(`:::> Server listening on port @ http://localhost:${PORT}`);
});

// On server error
app.on("error", (error) => {
  console.error(`<::: An error occurred on the server: \n ${error}`);
});
