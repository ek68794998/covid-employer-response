import express from "express";

import { Production } from "../../common/constants/EnvironmentConstants";
import { EmployerRecord } from "../../common/EmployerRecord";
import { EmployerRecordBase } from "../../common/EmployerRecordBase";
import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";
import { HttpResponseHeaders } from "../../common/http/HttpResponseHeaders";
import { HttpStatusCodes } from "../../common/http/HttpStatusCodes";
import { MimeTypes } from "../../common/MimeTypes";

import { DataLoadOptions } from "../storage/DataLoadOptions";
import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly MAX_GETEMPLOYERS_STANDARD: number = 500;

	private static readonly IS_PROD: boolean = process.env.NODE_ENV === Production;

	private readonly recordLoader: EmployerRecordLoader;

	public constructor(recordLoader: EmployerRecordLoader) {
		super();

		this.recordLoader = recordLoader;
	}

	public async getEmployer(req: express.Request, res: express.Response): Promise<void> {
		const idParam: string | null = req.params.employerId || null;

		if (!idParam) {
			res.status(HttpStatusCodes.BAD_REQUEST).send();

			return;
		}

		const loaderOptions: DataLoadOptions = {
			bypassCache: !EmployersController.IS_PROD && !req.header(HttpRequestHeaders.IF_NONE_MATCH),
		};

		const ids: string[] = idParam.split(",");
		const returnedEmployers: EmployerRecordBase[] = [];

		for (const id of ids) {
			if (!(await this.recordLoader.existsAsync(id, loaderOptions))) {
				continue;
			}

			returnedEmployers.push(await this.recordLoader.getAsync(id, loaderOptions));
		}

		if (returnedEmployers.length === 0) {
			res.status(HttpStatusCodes.NOT_FOUND).send();

			return;
		}

		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);

		if (returnedEmployers.length === 1) {
			res.send(returnedEmployers[0]);

			return;
		}

		res.send(returnedEmployers);
	}

	public async getEmployers(req: express.Request, res: express.Response): Promise<void> {
		const loaderOptions: DataLoadOptions = {
			bypassCache: !EmployersController.IS_PROD && !req.header(HttpRequestHeaders.IF_NONE_MATCH),
		};

		const employers: EmployerRecord[] = await this.recordLoader.getAllAsync(loaderOptions);

		const returnedEmployers: EmployerRecordBase[] =
			(await this.recordLoader.getAllMetadataAsync({})).slice(0, EmployersController.MAX_GETEMPLOYERS_STANDARD);

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
