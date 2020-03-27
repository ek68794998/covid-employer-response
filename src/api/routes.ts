import express from "express";

import EmployersController from "./controllers/EmployersController";
import { RoutedControllerBase } from "./controllers/RoutedControllerBase";

const router: express.Router = express.Router();

const controllers: RoutedControllerBase[] = [
	new EmployersController(),
];

controllers.forEach((controller: RoutedControllerBase) => router.use("/", controller.router));

export default router;