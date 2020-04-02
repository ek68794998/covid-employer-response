import { CitationSource } from "./CitationSource";

describe("CitationSource", () => {
	test("initializes with default values", () => {
		const c: CitationSource = new CitationSource();

		expect(c.date).toBeUndefined();
		expect(c.link).toBe("");
		expect(c.name).toBe("");
	});
});
