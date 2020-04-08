import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";
import { EmployerRecordBase } from "../../common/EmployerRecordBase";
import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";
import { HttpResponseHeaders } from "../../common/http/HttpResponseHeaders";
import { MimeTypes } from "../../common/MimeTypes";

import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly MAX_GETEMPLOYERS_DETAILED: number = 100;

	private static readonly MAX_GETEMPLOYERS_STANDARD: number = 500;

	private readonly recordLoader: EmployerRecordLoader = new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

	private employers: { [id: string]: EmployerRecord } = {};

	private hasEmployers: boolean = false;

	public async getEmployers(req: express.Request, res: express.Response): Promise<void> {
		if (!req.header(HttpRequestHeaders.IF_NONE_MATCH) || !this.hasEmployers) {
			const employerRecords: EmployerRecord[] = await this.recordLoader.loadAllAsync();

			for (const employerRecord of employerRecords) {
				this.employers[employerRecord.id] = employerRecord;
			}

			this.hasEmployers = true;
		}

		const returnedEmployers: EmployerRecordBase[] = [];

		if (req.query.ids) {
			const ids: string[] = req.query.ids.split(",");

			for (const id of ids) {
				if (!(id in this.employers)) {
					continue;
				}

				returnedEmployers.push(this.employers[id]);

				if (returnedEmployers.length === EmployersController.MAX_GETEMPLOYERS_DETAILED) {
					break;
				}
			}
		} else {
			for (const employerRecord of Object.values(this.employers)) {
				returnedEmployers.push(EmployerRecord.toMetadata(employerRecord));

				if (returnedEmployers.length === EmployersController.MAX_GETEMPLOYERS_STANDARD) {
					break;
				}
			}

			res.setHeader("Results-Total", Object.keys(this.employers).length);
		}

		res.setHeader("Results-Returned", returnedEmployers.length);
		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(returnedEmployers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployers.bind(this));
	}
}

export default EmployersController;
