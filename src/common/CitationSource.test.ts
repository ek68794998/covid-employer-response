import { CitationSource } from "./CitationSource";

describe("CitationSource", (): void => {
	test("initializes with default values", (): void => {
		const c: CitationSource = new CitationSource();

		expect(c.date).toBeUndefined();
		expect(c.link).toBe("");
		expect(c.source).toBe("");
		expect(c.title).toBe("");
	});
});
