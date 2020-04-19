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

describe("DataFileLoader", () => {
	test("throws exceptions if data path values are empty", async () => {
		expect(() => new MockDataFileLoader("", "")).toThrowError();
		expect(() => new MockDataFileLoader("real", "")).toThrowError();
		expect(() => new MockDataFileLoader("", "real")).toThrowError();
	});
});
