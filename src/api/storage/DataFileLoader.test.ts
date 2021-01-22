import { DataFileLoader } from "./DataFileLoader";

class MockDataFileLoader extends DataFileLoader<string> {
	public existsAsync(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	public getAllAsync(): Promise<string[]> {
		throw new Error("Method not implemented.");
	}

	public getAllIdsAsync(): Promise<string[]> {
		throw new Error("Method not implemented.");
	}

	public getAsync(): Promise<string> {
		throw new Error("Method not implemented.");
	}
}

describe("DataFileLoader", (): void => {
	test("throws exceptions if data path values are empty", async (): Promise<void> => {
		expect((): MockDataFileLoader => new MockDataFileLoader("", "")).toThrowError();
		expect((): MockDataFileLoader => new MockDataFileLoader("real", "")).toThrowError();
		expect((): MockDataFileLoader => new MockDataFileLoader("", "real")).toThrowError();
	});
});
