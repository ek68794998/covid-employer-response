/* istanbul ignore file */
/*
  No test coverage since testing express startup is not really feasible.
  Please keep as much logic out of this as possible.
*/

import express from "express";

// this require is necessary for server HMR to recover from error
// tslint:disable-next-line:no-var-requires
let app: any = require("./server").default;

if (module.hot) {
	module.hot.accept("./server", () => {
		console.log("🔁  HMR Reloading `./server`...");
		try {
			app = require("./server").default;
		} catch (error) {
			console.error(error);
		}
	});
	console.info("✅  Server-side HMR Enabled!");
}

const port: string = process.env.PORT || "3000";

export default express()
	.use((req, res) => app.handle(req, res))
	.listen(port, (err: Error) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`> Started on port ${port}`);
	});
