import express from "express";

//Controller Imports
import rootController from "./controllers/rootController"
const routes = express();

routes.get("/", rootController.get)

export default routes;