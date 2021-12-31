import { logger } from "@laurenz1606/logger";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";

//setup the express app
const app = express();

//confige common middlewares
app.use(express.json());
app.use(cors());

//use routers
app.use("/auth", authRouter);

//listen on port from the env vars
app.listen(process.env.EXPRESS_PORT, () => {
  logger(`Express listening on Port ${process.env.EXPRESS_PORT}!`, "info");
});
