/* eslint-disable @typescript-eslint/no-var-requires */
/*
  Imports for hot loading have to be done through require().
*/

/* istanbul ignore file */
/*
  No test coverage since testing express startup is not really feasible.
  Please keep as much logic out of this as possible.
*/

import express from "express";
import * as http from "http";
import { ReactText } from "react";

const onProcessWarning = (notice: Error): void => {
	console.warn(notice.stack);
};

process.on("warning", onProcessWarning);

let app: any = require("./server").default;

if (module.hot) {
	module.hot.accept([ "./server" ], (data: ReactText[]): void => {
		console.log(`🔁 HMR Reloading '${data.join("', '")}'...`);
		try {
			app = require("./server").default;
		} catch (error) {
			console.error(error);
		}
	});

	console.info("✅ Server-side HMR Enabled!");
}

const host: string = process.env.HOST || "localhost";
const port: number = parseInt(process.env.PORT || "3000", 10);

const expressServer: express.Express =
	express().use((req: express.Request, res: express.Response): void => app.handle(req, res));

const httpServer: http.Server =
	http.createServer(expressServer)
		.on("error", (err: Error): void => {
			console.error(err);
		});

if (host === "localhost") {
	httpServer.listen(port, (): void => {
		console.log(`> Started on local host. ( http://localhost:${port}/ )`);
	});
} else {
	httpServer.listen(port, host, (): void => {
		console.log(`> Started on custom host. ( http://${host}:${port}/ )`);
	});
}

export default httpServer;
