import { EmployerRecordLoader } from "../storage/EmployerRecordLoader";

import EmployersController from "./EmployersController";

const employerRecordLoader: EmployerRecordLoader =
	new EmployerRecordLoader(process.env.RAZZLE_PUBLIC_DIR || "/", "employers");

describe("EmployersController", (): void => {
	test("can initialize routes without exploding", (): void => {
		const controller: EmployersController =
			new EmployersController(employerRecordLoader);

		expect(controller.hasRoutes).toBe(true);
	});
});
