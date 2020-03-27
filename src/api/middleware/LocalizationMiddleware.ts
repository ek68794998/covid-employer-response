import parser from "accept-language-parser";
import express from "express";

import { HttpRequest } from "../models/HttpRequest";

interface Language {
	code: string;
	region?: string;
	quality: number;
}

export class LocalizationMiddleware {
	private defaultLanguage: string;

	private supportedLanguages: string[];

	public constructor(defaultLanguageCode: string, supportedLanguageCodeList: string[]) {
		this.defaultLanguage = defaultLanguageCode || "en-us";
		this.supportedLanguages =
			supportedLanguageCodeList
			&& supportedLanguageCodeList.map((value: string) => value.toLowerCase())
			|| [];
	}

	public invoke(req: express.Request, res: express.Response, next: express.NextFunction): void {
		const request: HttpRequest = req as HttpRequest;
		const isValidLanguage = (code: string): boolean => this.supportedLanguages.indexOf(code && code.toLowerCase()) >= 0;

		let userLanguage: string = this.defaultLanguage;

		try {
			const languageHeader: string = request.header("Accept-Language") ?? "";
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