import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";
import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";
import { HttpResponseHeaders } from "../../common/http/HttpResponseHeaders";

import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly MAX_GETEMPLOYERS_DETAILED: number = 100;

	private static readonly MAX_GETEMPLOYERS_STANDARD: number = 500;

	private readonly recordLoader: EmployerRecordLoader = new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

	private employers: EmployerRecord[] = [];

	public async getEmployersList(req: express.Request, res: express.Response): Promise<void> {
		if (!req.header(HttpRequestHeaders.IF_NONE_MATCH) || this.employers.length === 0) {
			this.employers = await this.recordLoader.loadAllAsync();
		}

		// TODO Allow individual field selection as well.
		const isDetailed: boolean = req.params.$select === "*";

		const max: number =
			isDetailed ? EmployersController.MAX_GETEMPLOYERS_DETAILED : EmployersController.MAX_GETEMPLOYERS_STANDARD;

		const skipParam: string = req.params.$skip || "0";
		const topParam: string = req.params.$top || `${max}`;

		const skipNumber: number = parseInt(skipParam, 10);
		const topNumber: number = parseInt(topParam, 10);

		const employers: EmployerRecord[] =
			isDetailed
				? this.employers
				: this.employers.map((e: EmployerRecord) => EmployerRecord.shallowClone(e, false));

		const returnedEmployers: EmployerRecord[] = employers.slice(skipNumber, skipNumber + topNumber);

		res.setHeader("Results-Returned", returnedEmployers.length);
		res.setHeader("Results-Total", this.employers.length);
		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, "application/json");
		res.send(returnedEmployers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployersList.bind(this));
	}
}

export default EmployersController;
