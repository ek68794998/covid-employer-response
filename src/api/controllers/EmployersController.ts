import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";

import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private readonly recordLoader: EmployerRecordLoader = new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

	private employers: EmployerRecord[] = [];

	public async getEmployersList(req: express.Request, res: express.Response): Promise<void> {
		if (!req.header("if-none-match") || this.employers.length === 0) {
			this.employers = await this.recordLoader.loadAllAsync();
		}

		res.setHeader("content-type", "application/json");
		res.send(this.employers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployersList.bind(this));
	}
}

export default EmployersController;
