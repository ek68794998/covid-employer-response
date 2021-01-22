import { WikipediaHelpers } from "./WikipediaHelpers";

describe("WikipediaHelpers", (): void => {
	test.each([
		[ "", null ],
		[ "mIRC", "https://en.wikipedia.org/wiki/mIRC" ],
		[ "Example", "https://en.wikipedia.org/wiki/Example" ],
		[ "Example Test", "https://en.wikipedia.org/wiki/Example_Test" ],
		[ "Example Test 2", "https://en.wikipedia.org/wiki/Example_Test_2" ],
		[ "Example    Test         2", "https://en.wikipedia.org/wiki/Example_Test_2" ],
	])(
		"gets Wikipedia URL for %p (%#)",
		(input: string, expected: string | null): void => {
			expect(WikipediaHelpers.getWikipediaUrl(input)).toBe(expected);
		},
	);
});
