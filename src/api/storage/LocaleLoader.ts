import fs from "fs";
import util from "util";
import yaml from "yaml";

import { LocalizedStrings } from "../../common/LocalizedStrings";

import { DataFileLoader } from "./DataFileLoader";

// tslint:disable-next-line: typedef // Type definition from 'promisify' is very complex.
const readdirAsync = util.promisify(fs.readdir);

// tslint:disable-next-line: typedef // Type definition from 'promisify' is very complex.
const readFileAsync = util.promisify(fs.readFile);

export class LocaleLoader extends DataFileLoader<LocalizedStrings> {
	private static readonly localeFileNameRegex: RegExp = /^(.*)\.json$/;

	public async getAllIdsAsync(): Promise<string[]> {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Locale record data folder not found.");
		}

		const fileNames: string[] = await readdirAsync(this.directoryPath, "UTF8") as string[];

		return (
			fileNames
				.map((fileName: string): string => {
					const regexResult: RegExpExecArray | null = LocaleLoader.localeFileNameRegex.exec(fileName);
					const id: string | null = regexResult && regexResult[1].toString();

					return id || "";
				})
				.filter((id: string): boolean => {
					return id.length > 0;
				})
		);
	}

	public async loadAsync(id: string): Promise<LocalizedStrings> {
		if (!fs.existsSync(this.directoryPath)) {
			throw new Error("Locale record data folder not found.");
		}

		const fileName: string = `${this.directoryPath}/${id}.json`;

		if (!fs.existsSync(fileName)) {
			throw new Error(`Data file with ID '${id}' not found.`);
		}

		const fileContents: string = await readFileAsync(fileName, "UTF8");
		const loadedLocale: LocalizedStrings = yaml.parse(fileContents);

		loadedLocale.id = id;

		return loadedLocale;
	}

	public async loadAllAsync(): Promise<LocalizedStrings[]> {
		const loadedLocales: LocalizedStrings[] = [];

		const LocalizedStringsIds: string[] = await this.getAllIdsAsync();

		for (const id of LocalizedStringsIds) {
			loadedLocales.push(await this.loadAsync(id));
		}

		return loadedLocales;
	}
}