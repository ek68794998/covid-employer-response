import fs from "fs";
import util from "util";
import yaml from "yaml";

import { EmployerRecord } from "../../common/EmployerRecord";

import { CachedDataFileLoader } from "./CachedDataFileLoader";
import { DataLoadOptions } from "./DataLoadOptions";

// Type definition from 'promisify' is very complex, so ignore those.
// eslint-disable-next-line @typescript-eslint/tslint/config
const existsAsync = util.promisify(fs.exists);
// eslint-disable-next-line @typescript-eslint/tslint/config
const readdirAsync = util.promisify(fs.readdir);
// eslint-disable-next-line @typescript-eslint/tslint/config
const readFileAsync = util.promisify(fs.readFile);

export class EmployerRecordLoader extends CachedDataFileLoader<EmployerRecord> {
	private static readonly EMPLOYER_FILE_REGEX: RegExp = /^(.*)\.yml$/;

	public existsAsync(id: string, options: DataLoadOptions): Promise<boolean> {
		if (!options.bypassCache && (id in this.cachedItems || this.cachedIds.indexOf(id) >= 0)) {
			return Promise.resolve(true);
		}

		return existsAsync(this.getFileName(id));
	}

	public async getAllIdsAsync(options: DataLoadOptions): Promise<string[]> {
		if (!options.bypassCache && this.cachedIds.length > 0) {
			return this.cachedIds;
		}

		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Employer record data folder not found.");
		}

		const fileNames: string[] = await readdirAsync(this.directoryPath, "UTF8") as string[];

		const ids: string[] =
			fileNames
				.map((fileName: string): string => {
					const regexResult: RegExpExecArray | null =
						EmployerRecordLoader.EMPLOYER_FILE_REGEX.exec(fileName);

					const recordId: string | null = regexResult && regexResult[1].toString();

					return recordId || "";
				})
				.filter((recordId: string): boolean => recordId.length > 0 && recordId !== "sample");

		this.cachedIds = ids;

		return ids;
	}

	public async getAsync(id: string, options: DataLoadOptions): Promise<EmployerRecord> {
		if (!options.bypassCache && id in this.cachedItems) {
			return this.cachedItems[id];
		}

		if (!(await this.existsAsync(id, options))) {
			throw new Error(`Data file with ID '${id}' not found.`);
		}

		const fileName: string = this.getFileName(id);
		const fileContents: string = await readFileAsync(fileName, "UTF8");

		let loadedEmployer: EmployerRecord = new EmployerRecord();

		loadedEmployer = { ...loadedEmployer, id, ...yaml.parse(fileContents) };

		this.cachedItems[id] = loadedEmployer;

		return loadedEmployer;
	}

	public async getAllAsync(options: DataLoadOptions): Promise<EmployerRecord[]> {
		const employerRecordIds: string[] =
			options.bypassCache || this.cachedIds.length === 0
				? await this.getAllIdsAsync(options)
				: this.cachedIds;

		const loadedEmployers: EmployerRecord[] = [];

		for (const recordId of employerRecordIds) {
			loadedEmployers.push(await this.getAsync(recordId, options));
		}

		this.cachedIds = loadedEmployers.map((e: EmployerRecord) => e.id);

		return loadedEmployers;
	}

	private getFileName(id: string): string {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Employer record data folder not found.");
		}

		return `${this.directoryPath}/${id}.yml`;
	}
}