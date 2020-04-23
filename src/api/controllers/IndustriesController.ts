import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";
import { MimeTypes } from "../../common/MimeTypes";
import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";
import { HttpResponseHeaders } from "../../common/http/HttpResponseHeaders";

import { DataLoadOptions } from "../storage/DataLoadOptions";
import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "industries";

	private readonly recordLoader: EmployerRecordLoader;

	public constructor(recordLoader: EmployerRecordLoader) {
		super();

		this.recordLoader = recordLoader;
	}

	public async getIndustries(req: express.Request, res: express.Response): Promise<void> {
		const loaderOptions: DataLoadOptions = {
			bypassCache: !req.header(HttpRequestHeaders.IF_NONE_MATCH),
		};

		const employers: EmployerRecord[] = await this.recordLoader.getAllAsync(loaderOptions);
		const industries: { [key: string]: boolean } = {};

		for (const employer of Object.values(employers)) {
			if (!employer.industries) {
				continue;
			}

			employer.industries.forEach((i: string) => industries[i] = true);
		}

		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(Object.keys(industries));
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getIndustries.bind(this));
	}
}

export default EmployersController;
