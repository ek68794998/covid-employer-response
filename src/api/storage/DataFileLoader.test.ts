import { DataFileLoader } from "./DataFileLoader";

class MockDataFileLoader extends DataFileLoader<string> {
	public existsAsync(id: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	public getAllIdsAsync(): Promise<string[]> {
		throw new Error("Method not implemented.");
	}

	public loadAsync(id: string): Promise<string> {
		throw new Error("Method not implemented.");
	}

	public loadAllAsync(): Promise<string[]> {
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
