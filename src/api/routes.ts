import express from "express";

import { RoutedControllerBase } from "./controllers/RoutedControllerBase";

const router: express.Router = express.Router();

const controllers: RoutedControllerBase[] = [];

controllers.forEach((controller: RoutedControllerBase) => router.use("/", controller.router));

export default router;