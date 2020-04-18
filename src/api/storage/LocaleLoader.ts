import fs from "fs";
import util from "util";
import yaml from "yaml";

import { LocalizedStrings } from "../../common/LocalizedStrings";

import { DataFileLoader } from "./DataFileLoader";
import { DataLoadOptions } from "./DataLoadOptions";

// Type definition from 'promisify' is very complex, so ignore those.
// eslint-disable-next-line @typescript-eslint/tslint/config
const existsAsync = util.promisify(fs.exists);
// eslint-disable-next-line @typescript-eslint/tslint/config
const readdirAsync = util.promisify(fs.readdir);
// eslint-disable-next-line @typescript-eslint/tslint/config
const readFileAsync = util.promisify(fs.readFile);

export class LocaleLoader extends DataFileLoader<LocalizedStrings> {
	private static readonly LOCALE_FILE_REGEX: RegExp = /^(.*)\.yml$/;

	public existsAsync(id: string, options: DataLoadOptions): Promise<boolean> {
		return existsAsync(this.getFileName(id));
	}

	public async getAllIdsAsync(options: DataLoadOptions): Promise<string[]> {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Locale record data folder not found.");
		}

		const fileNames: string[] = await readdirAsync(this.directoryPath, "UTF8") as string[];

		return (
			fileNames
				.map((fileName: string): string => {
					const regexResult: RegExpExecArray | null = LocaleLoader.LOCALE_FILE_REGEX.exec(fileName);
					const id: string | null = regexResult && regexResult[1].toString();

					return id || "";
				})
				.filter((id: string): boolean => id.length > 0)
		);
	}

	public async getAsync(id: string, options: DataLoadOptions): Promise<LocalizedStrings> {
		if (!(await this.existsAsync(id, options))) {
			throw new Error(`Data file with ID '${id}' not found.`);
		}

		const fileName: string = this.getFileName(id);
		const fileContents: string = await readFileAsync(fileName, "UTF8");
		const loadedLocale: LocalizedStrings = yaml.parse(fileContents);

		loadedLocale.id = id;

		return loadedLocale;
	}

	public async getAllAsync(options: DataLoadOptions): Promise<LocalizedStrings[]> {
		const loadedLocales: LocalizedStrings[] = [];

		const LocalizedStringsIds: string[] = await this.getAllIdsAsync(options);

		for (const id of LocalizedStringsIds) {
			loadedLocales.push(await this.getAsync(id, options));
		}

		return loadedLocales;
	}

	private getFileName(id: string): string {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Employer record data folder not found.");
		}

		return `${this.directoryPath}/${id}.yml`;
	}
}