import { format } from "./LocalizedStrings";

describe("LocalizedStrings", (): void => {
	test.each([
		[ "abc", {}, "abc" ],
		[ "abc", { b: "c" }, "abc" ],
		[ "a{bc", { b: "c" }, "a{bc" ],
		[ "ab}c", { b: "c" }, "ab}c" ],
		[ "a{b}c", { b: "c" }, "acc" ],
		[ "a{B}c", { b: "c" }, "aBc" ],
	])(
		"formats %p with arguments (%#)",
		(input: string, args: Record<string, any>, expected: string): void => {
			expect(format(input, args)).toBe(expected);
		},
	);
});
