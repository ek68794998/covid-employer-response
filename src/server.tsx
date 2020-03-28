import express from "express";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { FilledContext, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import serialize from "serialize-javascript";

import { LocalizationMiddleware } from "./api/middleware/LocalizationMiddleware";
import { HttpRequest } from "./api/models/HttpRequest";
import apiRoutes from "./api/routes";
import { LocalizedStrings } from "./common/LocalizedStrings";
import App from "./web/App";
import configureStore from "./web/state/configureStore";
import { getLocalizedStringsSuccess } from "./web/state/ducks/localization/actions";

export const DEFAULT_LANGUAGE: string = "en-us";

let assets: any;

const syncLoadAssets = (): void => {
	assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};

syncLoadAssets();

const localeFileNameRegex: RegExp = /^(.*)\.json$/;

const localeFileMap: { [key: string]: string[] } = {};
const localeFiles: string[] = fs.readdirSync(`${process.env.RAZZLE_PUBLIC_DIR}/strings`, "UTF8") as string[];

localeFiles.forEach((fileName: string) => {
	const regexResult: RegExpExecArray | null = localeFileNameRegex.exec(fileName);
	let localeCode: string | null = regexResult && regexResult[1];

	if (!localeCode) {
		return;
	}

	localeCode = localeCode.toLowerCase();

	if (!(localeCode in localeFileMap)) {
		localeFileMap[localeCode] = [];
	}

	localeFileMap[localeCode].push(fileName);
});

const localizationMiddleware: LocalizationMiddleware =
	new LocalizationMiddleware(DEFAULT_LANGUAGE, Object.keys(localeFileMap));

const server: express.Application = express()
	.disable("x-powered-by")
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
	.use(localizationMiddleware.invoke.bind(localizationMiddleware))
	.use("/api", apiRoutes)
	.get("/*", (req: express.Request, res: express.Response) => {
		const isProd: boolean = process.env.NODE_ENV === "production";
		const request: HttpRequest = req as HttpRequest;
		const context: {} = {}; // TODO
		const preloadedState: {} = {}; // TODO

		const localeCode: string = request.languageCode.toLowerCase();
		let localeData: LocalizedStrings = {};

		localeFileMap[localeCode].forEach((fileName: string) => {
			const jsonString: string =
				fs.readFileSync(`${process.env.RAZZLE_PUBLIC_DIR}/strings/${fileName}`, "UTF8");

			const jsonData: LocalizedStrings = JSON.parse(jsonString);

			localeData = { ...localeData, ...jsonData };
		});

		const store: Store<{}, AnyAction> = configureStore(preloadedState);
		store.dispatch(getLocalizedStringsSuccess(localeData));

		const helmetContext: {} = {};

		const markup: string = renderToString(
			<Provider store={store}>
				<HelmetProvider context={helmetContext}>
					<StaticRouter context={context} location={req.url}>
						<App />
					</StaticRouter>
				</HelmetProvider>
			</Provider>,
		);

		const { helmet } = helmetContext as FilledContext;

		res.send(
			`<!doctype html>
				<html lang="${localeCode}">
				<head>
					${helmet.title}
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1">
					${
						assets.client.css
							? `<link rel="stylesheet" href="${assets.client.css}">`
							: ""
					}
					<link href="https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@400;500&display=swap" rel="stylesheet">
				</head>
				<body>
					<div id="root">${markup}</div>
					<script>
						window.__PRELOADED_STATE__ = ${serialize(store.getState())}
					</script>
					${
						isProd
							? `<script src="${assets.client.js}" defer></script>`
							: `<script src="${assets.client.js}" defer crossorigin></script>`
					}
				</body>
			</html>`,
		);
	});

export default server;
