import { format } from "./LocalizedStrings";

describe("LocalizedStrings", () => {
	test.each([
		[ "abc", {}, "abc" ],
		[ "abc", { b: "c" }, "abc" ],
		[ "a{bc", { b: "c" }, "a{bc" ],
		[ "ab}c", { b: "c" }, "ab}c" ],
		[ "a{b}c", { b: "c" }, "acc" ],
		[ "a{B}c", { b: "c" }, "aBc" ],
	])(
		"formats '%p' with arguments (%#)",
		(input: string, args: {}, expected: string) => {
			expect(format(input, args)).toBe(expected);
		},
	);
});
