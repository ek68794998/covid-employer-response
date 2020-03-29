import express from "express";
import fs from "fs";
import yaml from "yaml";

import { RoutedControllerBase } from "./RoutedControllerBase";

import { EmployerRecord } from "../../common/EmployerRecord";

class EmployersController extends RoutedControllerBase {
	public static readonly SUBPATH: string = "employers";

	private static readonly employerFileNameRegex: RegExp = /^(.*)\.yml$/;

	private employers: EmployerRecord[] = [];

	public getEmployersList(req: express.Request, res: express.Response): void {
		if (!req.header("if-none-match") || this.employers.length === 0) {
			const folder: string = `${process.env.RAZZLE_PUBLIC_DIR}/employers`;

			const loadedEmployers: EmployerRecord[] = [];

			const employerFileNames: string[] = fs.readdirSync(folder, "UTF8") as string[];

			employerFileNames.forEach((fileName: string) => {
				const regexResult: RegExpExecArray | null = EmployersController.employerFileNameRegex.exec(fileName);
				const recordId: string | null = regexResult && regexResult[1].toString();

				if (!recordId || recordId === "sample") {
					return;
				}

				const fileContents: string = fs.readFileSync(`${folder}/${fileName}`, "UTF8");
				const record: EmployerRecord = yaml.parse(fileContents);

				record.id = recordId;

				loadedEmployers.push(record);
			});

			this.employers =
				loadedEmployers.sort(
					(a: EmployerRecord, b: EmployerRecord) => a.name.localeCompare(b.name));
		}

		res.setHeader("Content-Type", "application/json");
		res.send(this.employers);
	}

	protected initializeRoutes(): void {
		this.router.get(`/${EmployersController.SUBPATH}`, this.getEmployersList.bind(this));
	}
}

export default EmployersController;
