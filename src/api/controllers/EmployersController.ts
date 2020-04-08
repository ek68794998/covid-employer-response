import express from "express";

import { EmployerRecord } from "../../common/EmployerRecord";
import { EmployerRecordBase } from "../../common/EmployerRecordBase";
import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";
import { HttpResponseHeaders } from "../../common/http/HttpResponseHeaders";
import { HttpStatusCodes } from "../../common/http/HttpStatusCodes";
import { MimeTypes } from "../../common/MimeTypes";

import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import { RoutedControllerBase } from "./RoutedControllerBase";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly MAX_GETEMPLOYERS_STANDARD: number = 500;

	private readonly recordLoader: EmployerRecordLoader = new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

	private employers: { [id: string]: EmployerRecord } = {};

	private hasEmployers: boolean = false;

	public async getEmployer(req: express.Request, res: express.Response): Promise<void> {
		const id: string | null = req.param("id", null);

		if (!id) {
			res.status(HttpStatusCodes.BAD_REQUEST).send();

			return;
		}

		let employerRecord: EmployerRecord | null = null;

		if (req.header(HttpRequestHeaders.IF_NONE_MATCH) && id in this.employers) {
			employerRecord = this.employers[id];
		} else if (await this.recordLoader.existsAsync(id)) {
			employerRecord = await this.recordLoader.loadAsync(id);
		}

		if (!employerRecord) {
			res.status(HttpStatusCodes.NOT_FOUND).send();

			return;
		}

		this.employers[id] = employerRecord;

		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(employerRecord);
	}

	public async getEmployerCategories(req: express.Request, res: express.Response): Promise<void> {
		if (!req.header(HttpRequestHeaders.IF_NONE_MATCH) || !this.hasEmployers) {
			await this.reloadEmployersAsync();
		}

		const categories: string[] = [ "technology", "healthcare", "grocery" ];

		/*
		for (const employer of Object.values(this.employers)) {
			// TODO // categories.push(employer.category);
		}
		*/

		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(categories);
	}

	public async getEmployers(req: express.Request, res: express.Response): Promise<void> {
		if (!req.header(HttpRequestHeaders.IF_NONE_MATCH) || !this.hasEmployers) {
			await this.reloadEmployersAsync();
		}

		const returnedEmployers: EmployerRecordBase[] = [];

		for (const employerRecord of Object.values(this.employers)) {
			returnedEmployers.push(EmployerRecord.toMetadata(employerRecord));

			if (returnedEmployers.length === EmployersController.MAX_GETEMPLOYERS_STANDARD) {
				break;
			}
		}

		res.setHeader("Results-Total", Object.keys(this.employers).length);
		res.setHeader("Results-Returned", returnedEmployers.length);
		res.setHeader(HttpResponseHeaders.CONTENT_TYPE, MimeTypes.APPLICATION_JSON);
		res.send(returnedEmployers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployers.bind(this));
		this.router.get(`/${EmployersController.SUBPATH}/categories`, this.getEmployerCategories.bind(this));
		this.router.get(`/${EmployersController.SUBPATH}/category/:categoryId`, this.getEmployers.bind(this));
	}

	private async reloadEmployersAsync(): Promise<void> {
		const employerRecords: EmployerRecord[] = await this.recordLoader.loadAllAsync();

		for (const employerRecord of employerRecords) {
			this.employers[employerRecord.id] = employerRecord;
		}

		this.hasEmployers = true;
	}
}

export default EmployersController;
