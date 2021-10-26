import express from "express";
import routes from "./routes";
import databaseConnection from "./database/database";
const app = express();


databaseConnection.getConnect()

app.use("/api", routes);

export default app;