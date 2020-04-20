import { EmployeeNumber } from "./EmployeeNumber";

describe("EmployeeNumber", () => {
	test.each([
		[ 0, "0" ],
		[ 1, "1" ],
		[ 23, "23" ],
		[ 345, "345" ],
		[ 4567, "4,567" ],
		[ 56789, "56,789" ],
		[ 678901, "678,901" ],
		[ 4000, "4,000" ],
		[ 50000, "50,000" ],
		[ 600000, "600,000" ],
		[ 7890123, "7.9 million" ],
		[ 89012345, "89 million" ],
		[ 901234567, "901.2 million" ],
		[ 1234567890, "1.2 billion" ],
	])("toString converts %p to normal string %p (%#)", (n: number, expected: string) => {
		expect(new EmployeeNumber(n).toString()).toBe(expected);
	});

	test.each([
		[ 0, "0" ],
		[ 1, "1" ],
		[ 23, "23" ],
		[ 345, "345" ],
		[ 4567, "4,567" ],
		[ 56789, "56,789" ],
		[ 678901, "678,901" ],
		[ 4000, "4k" ],
		[ 50000, "50k" ],
		[ 600000, "600k" ],
		[ 7890123, "7.9m" ],
		[ 89012345, "89m" ],
		[ 901234567, "901.2m" ],
		[ 1234567890, "1.2b" ],
	])("toString converts %p to short string %p (%#)", (n: number, expected: string) => {
		expect(new EmployeeNumber(n).toString(true)).toBe(expected);
	});

	test.each([
		[ 0, null ],
		[ 1, null ],
		[ 23, null ],
		[ 345, null ],
		[ 4567, null ],
		[ 56789, null ],
		[ 678901, null ],
		[ 4000, 3 ],
		[ 50000, 3 ],
		[ 600000, 3 ],
		[ 7890123, 6 ],
		[ 89012345, 6 ],
		[ 901234567, 6 ],
		[ 1234567890, 9 ],
	])("sets the magnitude correctly (%#)", (n: number, expected: number | null) => {
		expect(new EmployeeNumber(n).magnitude).toBe(expected);
	});
});
