import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";

import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly MAX_GETEMPLOYERS_DETAILED: number = 100;

	private static readonly MAX_GETEMPLOYERS_STANDARD: number = 500;

	private readonly recordLoader: EmployerRecordLoader = new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

	private employers: EmployerRecord[] = [];

	public async getEmployersList(req: express.Request, res: express.Response): Promise<void> {
		if (!req.header("if-none-match") || this.employers.length === 0) {
			this.employers = await this.recordLoader.loadAllAsync();
		}

		// TODO Allow individual field selection as well.
		const isDetailed: boolean = req.params["$select"] === "*";

		const max: number =
			isDetailed ? EmployersController.MAX_GETEMPLOYERS_DETAILED : EmployersController.MAX_GETEMPLOYERS_STANDARD;

		const skipParam: string = req.params["$skip"] || "0";
		const topParam: string = req.params["$top"] || `${max}`;

		const skip: number = parseInt(skipParam);
		const top: number = parseInt(topParam);

		const employers: EmployerRecord[] =
			isDetailed
				? this.employers
				: this.employers.filter((e: EmployerRecord) => e.shallowClone(false));

		const returnedEmployers: EmployerRecord[] = employers.slice(skip, skip + top);

		res.setHeader("results-returned", returnedEmployers.length);
		res.setHeader("results-total", this.employers.length);
		res.setHeader("content-type", "application/json");
		res.send(returnedEmployers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployersList.bind(this));
	}
}

export default EmployersController;
