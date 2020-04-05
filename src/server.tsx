/* istanbul ignore file */
/*
  No test coverage since testing express initialization is not really feasible.
  Please keep as much logic out of this as possible.
*/

import deepmerge from "deepmerge";
import express from "express";
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
import { LocaleLoader } from "./api/storage/LocaleLoader";
import { LocalizedStrings } from "./common/LocalizedStrings";
import App from "./web/App";
import { AppState } from "./web/state/AppState";
import configureStore from "./web/state/configureStore";
import { getIsProd } from "./web/state/ducks/environment/selectors";
import { getLocalizedStringsSuccess } from "./web/state/ducks/localization/actions";

export const DEFAULT_LANGUAGE: string = "en-us";

let assets: any;

const syncLoadAssets = (): void => {
	assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};

syncLoadAssets();

const localeLoader: LocaleLoader =
	new LocaleLoader(process.env.RAZZLE_PUBLIC_DIR || "", "strings");

const localizationMiddleware: LocalizationMiddleware =
	new LocalizationMiddleware(DEFAULT_LANGUAGE, localeLoader);

const server: express.Application = express()
	.disable("x-powered-by")
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
	.use(localizationMiddleware.invokeAsync.bind(localizationMiddleware))
	.use("/api", apiRoutes)
	.get("/*", async (req: express.Request, res: express.Response) => {
		const request: HttpRequest = req as HttpRequest;
		const context: {} = {};
		const preloadedState: Partial<AppState> = {};

		const localeCode: string = request.languageCode.toLowerCase();

		const defaultLocaleData: LocalizedStrings = await localeLoader.loadAsync(DEFAULT_LANGUAGE);
		const currentLocaleData: LocalizedStrings = await localeLoader.loadAsync(localeCode);

		const localeData: LocalizedStrings = deepmerge(defaultLocaleData, currentLocaleData);

		const store: Store<AppState, AnyAction> = configureStore(preloadedState);
		store.dispatch(getLocalizedStringsSuccess(localeData));

		const baseUrl: string =
			`${req.protocol}://${req.get("host")}`;

		const completeUrl: string =
			`${baseUrl}${req.originalUrl}`;

		const alternateLocaleMetaTags: string[] =
			localizationMiddleware.languages
				.map((key: string) => `<meta property="og:locale:alternate" content="${key}" />`);

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

		const appState: AppState = store.getState();

		res.send(
			`<!doctype html>
				<html lang="${localeCode}">
				<head>
					${helmet.title}
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width" />
					<meta property="og:title" content="${localeData.appTitle}" />
					<meta property="og:url" content="${completeUrl}" />
					<meta property="og:image" content="${baseUrl}/favicon-32x32.png" />
					<meta property="og:type" content="website" />
					<meta property="og:description" content="A collaborative, open-source project designed to track the responses of employers to the coronavirus (COVID-19) pandemic of 2019-2020." />
					<meta property="og:locale" content="${localeCode}" />
					${alternateLocaleMetaTags.join("")}
					<meta property="og:site_name" content="${localeData.appTitle}" />
					<meta property="og:determiner" content="the" />
					${
						assets.client.css
							? `<link rel="stylesheet" href="${assets.client.css}" />`
							: ""
					}
					<link href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Merriweather:wght@300&family=Baloo+Chettan+2:wght@400;500&display=swap" rel="stylesheet" />
				</head>
				<body>
					<div id="root">${markup}</div>
					<script>
						window.__PRELOADED_STATE__ = ${serialize(appState)}
					</script>
					${
						getIsProd(appState)
							? `<script src="${assets.client.js}" defer></script>`
							: `<script src="${assets.client.js}" defer crossorigin></script>`
					}
				</body>
			</html>`,
		);
	});

export default server;
