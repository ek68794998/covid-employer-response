import { EmployerRecordLoader } from "./EmployerRecordLoader";

describe("EmployerRecordLoader", () => {
	test("throws exceptions if data folder does not exist", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./not-real", "employers");

		expect(loader.getAllIdsAsync({})).rejects.toBeInstanceOf(Error);
		expect(loader.getAsync("_sample", {})).rejects.toBeInstanceOf(Error);
		expect(loader.getAllAsync({})).rejects.toBeInstanceOf(Error);
	});

	test("throws exception if loadAsync cannot find data file", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./public", "employers");

		expect(loader.getAsync("not-a-real-employer", {})).rejects.toBeInstanceOf(Error);
	});
});
