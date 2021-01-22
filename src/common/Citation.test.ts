import { Citation } from "./Citation";

describe("Citation", (): void => {
	test("initializes with default values", (): void => {
		const c: Citation = new Citation();

		expect(c.positivity).toBe(0);
		expect(c.sources).toBeUndefined();
		expect(c.summary).toBe("");
		expect(c.type).toBe("hearsay");
	});
});
