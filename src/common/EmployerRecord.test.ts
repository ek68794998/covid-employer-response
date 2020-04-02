import { EmployerRating } from "./EmployerRating";
import { EmployerRecord } from "./EmployerRecord";

// This is a hack for the test thinking that the value passed as the expected result of a test data row is a string.
const er = (t: EmployerRating): EmployerRating => t;

describe("EmployerRecord", () => {
	test.each([
		[ [ -2 ], er("poor") ],
		[ [ -2, 2, 0 ], er("fair") ],
		[ [ 2 ], er("good") ],
		[ [ -1 ], er("poor") ],
		[ [ 1 ], er("good") ],
		[ [ 0 ], er("fair") ],
		[ [ 0, 0, 0, 0, 0 ], er("fair") ],
		[ [ -2, 0, 0, 0, 0 ], er("fair") ],
	])(
		"getRating properly generates based on EmployerRecord fields (%#)",
		(ratings: number[], expected: EmployerRating) => {
			const e: EmployerRecord = new EmployerRecord();

			ratings.forEach((value: number) => e.citations.push({ positivity: value, summary: "" }));

			expect(EmployerRecord.getRating(e)).toBe(expected);
		},
	);
});
