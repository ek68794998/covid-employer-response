import EmployersController from "./EmployersController";

describe("EmployersController", () => {
	test("can initialize routes without exploding", () => {
		const controller: EmployersController = new EmployersController();

		expect(controller.hasRoutes).toBe(true);
	});
});
