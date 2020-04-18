import parser from "accept-language-parser";
import express from "express";

import { HttpRequestHeaders } from "../../common/http/HttpRequestHeaders";

import { HttpRequest } from "../models/HttpRequest";
import { LocaleLoader } from "../storage/LocaleLoader";

interface Language {
	code: string;
	region?: string;
	quality: number;
}

export class LocalizationMiddleware {
	private readonly defaultLanguage: string;

	private readonly localeLoader: LocaleLoader;

	private supportedLanguages: string[] = [];

	public constructor(defaultLanguageCode: string, localeLoader: LocaleLoader) {
		this.defaultLanguage = defaultLanguageCode;
		this.localeLoader = localeLoader;
	}

	public get languages(): string[] {
		return this.supportedLanguages;
	}

	public async invokeAsync(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
		if (!req.header(HttpRequestHeaders.IF_NONE_MATCH) || this.supportedLanguages.length === 0) {
			this.supportedLanguages = await this.localeLoader.getAllIdsAsync({});
		}

		const request: HttpRequest = req as HttpRequest;
		const isValidLanguage = (code: string): boolean =>
			this.supportedLanguages.indexOf(code && code.toLowerCase()) >= 0;

		let userLanguage: string = this.defaultLanguage;

		try {
			const languageHeader: string = request.header(HttpRequestHeaders.ACCEPT_LANGUAGE) ?? "";
			const languages: Language[] = parser.parse(languageHeader);

			for (const language of languages) {
				const languageCode: string = language.code;
				const regionCode: string =
					(languageCode && language.region && `${languageCode}-${language.region}`) || "";

				if (isValidLanguage(regionCode)) {
					userLanguage = regionCode;
					break;
				}

				if (isValidLanguage(languageCode)) {
					userLanguage = languageCode;
					break;
				}
			}
		} catch (e) {
			console.error("Unable to load language:", e);
		}

		request.languageCode = userLanguage;

		next();
	}
}