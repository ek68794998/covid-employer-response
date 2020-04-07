import fs from "fs";
import util from "util";
import yaml from "yaml";

import { EmployerRecord } from "../../common/EmployerRecord";

import { DataFileLoader } from "./DataFileLoader";

// tslint:disable-next-line: typedef // Type definition from 'promisify' is very complex.
const readdirAsync = util.promisify(fs.readdir);

// tslint:disable-next-line: typedef // Type definition from 'promisify' is very complex.
const readFileAsync = util.promisify(fs.readFile);

export class EmployerRecordLoader extends DataFileLoader<EmployerRecord> {
	private static readonly EMPLOYER_FILE_REGEX: RegExp = /^(.*)\.yml$/;

	public async getAllIdsAsync(): Promise<string[]> {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Employer record data folder not found.");
		}

		const fileNames: string[] = await readdirAsync(this.directoryPath, "UTF8") as string[];

		return (
			fileNames
				.map((fileName: string): string => {
					const regexResult: RegExpExecArray | null =
						EmployerRecordLoader.EMPLOYER_FILE_REGEX.exec(fileName);

					const recordId: string | null = regexResult && regexResult[1].toString();

					return recordId || "";
				})
				.filter((recordId: string): boolean => recordId.length > 0 && recordId !== "sample")
		);
	}

	public async loadAsync(id: string): Promise<EmployerRecord> {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Employer record data folder not found.");
		}

		const fileName: string = `${this.directoryPath}/${id}.yml`;

		if (!fs.existsSync(fileName)) {
			throw new Error(`Data file with ID '${id}' not found.`);
		}

		const fileContents: string = await readFileAsync(fileName, "UTF8");
		const loadedEmployer: EmployerRecord = yaml.parse(fileContents);

		loadedEmployer.id = id;

		return loadedEmployer;
	}

	public async loadAllAsync(): Promise<EmployerRecord[]> {
		const loadedEmployers: EmployerRecord[] = [];

		const employerRecordIds: string[] = await this.getAllIdsAsync();

		for (const recordId of employerRecordIds) {
			loadedEmployers.push(await this.loadAsync(recordId));
		}

		return (
			loadedEmployers.sort(
				(a: EmployerRecord, b: EmployerRecord) => a.name.localeCompare(b.name))
		);
	}
}