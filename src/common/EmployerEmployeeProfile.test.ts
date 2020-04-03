import { EmployerEmployeeProfile, EmployerEmployeeProfileType } from "./EmployerEmployeeProfile";

// This is a hack for the test thinking that the value passed to the 'type' field of a test data row is a string.
const tc = (t: EmployerEmployeeProfileType): EmployerEmployeeProfileType => t;

// This is a hack for the test thinking that the value passed to the 'yearQuarter' field of a test data row is a string.
const yq = (t: "Q1" | "Q2" | "Q3" | "Q4"): "Q1" | "Q2" | "Q3" | "Q4" => t;

describe("EmployerEmployeeProfile", () => {
	test("initializes with default values", () => {
		const p: EmployerEmployeeProfile = new EmployerEmployeeProfile();

		expect(p.lowerBound).toBeUndefined();
		expect(p.type).toBe("exactly");
		expect(p.upperBound).toBe(0);
		expect(p.year).toBe(0);
		expect(p.yearQuarter).toBeUndefined();
	});

	test.each([
		[ { type: tc("approximately"), upperBound: 0, year: 2010 } ],
		[ { type: tc("exactly"), upperBound: 0, year: 2010 } ],
		[ { lowerBound: 50, type: tc("range"), upperBound: 5, year: 2010 } ],
		[ { lowerBound: 0, type: tc("range"), upperBound: 0, year: 2010 } ],
	])("errors out when invalid bounds are provided (%#)", (p: EmployerEmployeeProfile) => {
		expect(() => EmployerEmployeeProfile.toString(p, false, false)).toThrowError();
	});

	test.each([
		[ { type: tc("exactly"), upperBound: 1, year: 2010 }, false, false, "1" ],
		[ { type: tc("exactly"), upperBound: 1000, year: 2010 }, false, false, "1,000" ],
		[ { type: tc("exactly"), upperBound: 1000000, year: 2010 }, false, false, "1 million" ],
		[ { type: tc("exactly"), upperBound: 1500000, year: 2010 }, false, false, "1.5 million" ],
		[ { type: tc("approximately"), upperBound: 1, year: 2010 }, false, false, "~1" ],
		[ { type: tc("approximately"), upperBound: 1000, year: 2010 }, false, false, "~1,000" ],
		[ { type: tc("approximately"), upperBound: 1000000, year: 2010 }, false, false, "~1 million" ],
		[ { type: tc("approximately"), upperBound: 1500000, year: 2010 }, false, false, "~1.5 million" ],
		[ { type: tc("range"), upperBound: 1, year: 2010 }, false, false, "Less than 1" ],
		[ { type: tc("range"), upperBound: 1000, year: 2010 }, false, false, "Less than 1,000" ],
		[ { type: tc("range"), upperBound: 1000000, year: 2010 }, false, false, "Less than 1 million" ],
		[ { type: tc("range"), upperBound: 1500000, year: 2010 }, false, false, "Less than 1.5 million" ],
		[ { lowerBound: 1, type: tc("range"), upperBound: 0, year: 2010 }, false, false, "More than 1" ],
		[ { lowerBound: 1000, type: tc("range"), upperBound: 0, year: 2010 }, false, false, "More than 1,000" ],
		[ { lowerBound: 1000000, type: tc("range"), upperBound: 0, year: 2010 }, false, false, "More than 1 million" ],
		[ { lowerBound: 1500000, type: tc("range"), upperBound: 0, year: 2010 }, false, false, "More than 1.5 million" ],
		[ { lowerBound: 1, type: tc("range"), upperBound: 5, year: 2010 }, false, false, "1 – 5" ],
		[ { lowerBound: 500, type: tc("range"), upperBound: 1234, year: 2010 }, false, false, "500 – 1,234" ],
		[ { lowerBound: 900000, type: tc("range"), upperBound: 1100000, year: 2010 }, false, false, "900,000 – 1.1 million" ],
		[ { lowerBound: 1100000, type: tc("range"), upperBound: 1500000, year: 2010 }, false, false, "1.1 – 1.5 million" ],
		[ { type: tc("range"), upperBound: 1, year: 2010 }, false, true, "≤ 1" ],
		[ { type: tc("range"), upperBound: 1000, year: 2010 }, false, true, "≤ 1,000" ],
		[ { type: tc("range"), upperBound: 1000000, year: 2010 }, false, true, "≤ 1 million" ],
		[ { type: tc("range"), upperBound: 1500000, year: 2010 }, false, true, "≤ 1.5 million" ],
		[ { lowerBound: 1, type: tc("range"), upperBound: 0, year: 2010 }, false, true, "≥ 1" ],
		[ { lowerBound: 1000, type: tc("range"), upperBound: 0, year: 2010 }, false, true, "≥ 1,000" ],
		[ { lowerBound: 1000000, type: tc("range"), upperBound: 0, year: 2010 }, false, true, "≥ 1 million" ],
		[ { lowerBound: 1500000, type: tc("range"), upperBound: 0, year: 2010 }, false, true, "≥ 1.5 million" ],
		[ { lowerBound: 1, type: tc("range"), upperBound: 5, year: 2010 }, false, true, "1 – 5" ],
		[ { lowerBound: 500, type: tc("range"), upperBound: 1234, year: 2010 }, false, true, "500 – 1,234" ],
		[ { lowerBound: 900000, type: tc("range"), upperBound: 1100000, year: 2010 }, false, true, "900,000 – 1.1 million" ],
		[ { lowerBound: 1100000, type: tc("range"), upperBound: 1500000, year: 2010 }, false, true, "1.1 – 1.5 million" ],
		[ { type: tc("exactly"), upperBound: 1000, year: 2010 }, true, false, "1,000 (2010)" ],
		[ { type: tc("exactly"), upperBound: 1000, year: 2010, yearQuarter: yq("Q3") }, true, false, "1,000 (Q3 2010)" ],
	])(
		"toString properly generates based on EmployerEmployeeProfile fields (%#)",
		(p: EmployerEmployeeProfile, useDate: boolean, short: boolean, expected: string) => {
			expect(EmployerEmployeeProfile.toString(p, useDate, short)).toBe(expected);
		},
	);
});
