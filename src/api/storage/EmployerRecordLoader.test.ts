import { EmployerRecord } from "../../common/EmployerRecord";

import { EmployerRecordLoader } from "./EmployerRecordLoader";

describe("EmployerRecordLoader", () => {
	test("throws exceptions if data folder does not exist", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./not-real", "employers");

		expect(loader.getAllIdsAsync()).rejects.toBeInstanceOf(Error);
		expect(loader.loadAsync("sample")).rejects.toBeInstanceOf(Error);
		expect(loader.loadAllAsync()).rejects.toBeInstanceOf(Error);
	});

	test("throws exception if loadAsync cannot find data file", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./public", "employers");

		expect(loader.loadAsync("not-a-real-employer")).rejects.toBeInstanceOf(Error);
	});
});
