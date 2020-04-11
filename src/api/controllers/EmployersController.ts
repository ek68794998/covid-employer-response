import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";
import { EmployerRecordBase } from "../../common/EmployerRecordBase";
import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";
import { HttpResponseHeaders } from "../../common/http/HttpResponseHeaders";
import { HttpStatusCodes } from "../../common/http/HttpStatusCodes";
import { MimeTypes } from "../../common/MimeTypes";

import { DataFileLoaderOptions } from "../storage/DataFileLoaderOptions";
import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly MAX_GETEMPLOYERS_STANDARD: number = 500;

	private readonly recordLoader: EmployerRecordLoader;

	public constructor(recordLoader: EmployerRecordLoader) {
		super();

		this.recordLoader = recordLoader;
	}

	public async getEmployer(req: express.Request, res: express.Response): Promise<void> {
		const id: string | null = req.params.employerId || null;

		if (!id) {
			res.status(HttpStatusCodes.BAD_REQUEST).send();

			return;
		}

		const loaderOptions: DataFileLoaderOptions = {
			bypassCache: !req.header(HttpRequestHeaders.IF_NONE_MATCH),
		};

		const employerRecord: EmployerRecord | null =
			await this.recordLoader.existsAsync(id, loaderOptions)
				? await this.recordLoader.getAsync(id, loaderOptions)
				: null;

		if (!employerRecord) {
			res.status(HttpStatusCodes.NOT_FOUND).send();

			return;
		}

		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(employerRecord);
	}

	public async getEmployers(req: express.Request, res: express.Response): Promise<void> {
		const loaderOptions: DataFileLoaderOptions = {
			bypassCache: !req.header(HttpRequestHeaders.IF_NONE_MATCH),
		};

		const employers: EmployerRecord[] = await this.recordLoader.getAllAsync(loaderOptions);
		const returnedEmployers: EmployerRecordBase[] = [];

		for (const employerRecord of Object.values(employers)) {
			returnedEmployers.push(EmployerRecord.toMetadata(employerRecord));

			if (returnedEmployers.length === EmployersController.MAX_GETEMPLOYERS_STANDARD) {
				break;
			}
		}

		res.setHeader("Results-Total", Object.keys(employers).length);
		res.setHeader("Results-Returned", returnedEmployers.length);
		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(returnedEmployers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployers.bind(this));
		this.router.get(`/${EmployersController.SUBPATH}/:employerId`, this.getEmployer.bind(this));
		this.router.get(`/${EmployersController.SUBPATH}/industry/:industryId`, this.getEmployers.bind(this));
	}
}

export default EmployersController;
