import express from "express";

import EmployersController from "./controllers/EmployersController";
import IndustriesController from "./controllers/IndustriesController";
import { RoutedControllerBase } from "./controllers/RoutedControllerBase";
import { EmployerRecordLoader } from "./storage/EmployerRecordLoader";

const router: express.Router = express.Router();

const employerRecordLoader: EmployerRecordLoader =
	new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

const controllers: RoutedControllerBase[] = [
	new EmployersController(employerRecordLoader),
	new IndustriesController(employerRecordLoader),
];

controllers.forEach((controller: RoutedControllerBase) => router.use("/", controller.router));

export default router;