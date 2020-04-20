import { EmployerRating } from "./EmployerRating";
import { EmployerRecord } from "./EmployerRecord";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

// This is a hack for the test thinking that the value passed as the expected result of a test data row is a string.
const er = (t: EmployerRating): EmployerRating => t;

describe("EmployerRecord", () => {
	test.each([
		[ [], er("fair") ],
		[ [ -2 ], er("poor") ],
		[ [ -2, 2, 0 ], er("fair") ],
		[ [ 2 ], er("good") ],
		[ [ 1, 0 ], er("fair") ],
		[ [ -1 ], er("fair") ],
		[ [ -1, 0 ], er("fair") ],
		[ [ 1 ], er("fair") ],
		[ [ 0 ], er("fair") ],
		[ [ 0, 0, 0, 0, 0 ], er("fair") ],
		[ [ -2, 0, 0, 0, 0 ], er("poor") ],
		[ [ 1, 1, 1, 0, 0, -1 ], er("good") ],
		[ [ 1, -1, -1, 0, 0, -1 ], er("poor") ],
	])(
		"properly calculates %p ratings as %p (%#)",
		(ratings: number[], expected: EmployerRating) => {
			const record: EmployerRecord = new EmployerRecord();

			record.citations = ratings.map((r: number) => ({ positivity: r, summary: "N/A", type: "hearsay" }));

			expect(EmployerRecord.toMetadata(record).rating).toBe(expected);
		},
	);

	test("toMetadata properly creates an object", () => {
		const record: EmployerRecord = new EmployerRecord();

		record.citations.push(
			{ positivity: 2, summary: "a", type: "hearsay" },
			{ positivity: 1, summary: "b", type: "hearsay" },
			{ positivity: 0, summary: "c", type: "hearsay" },
			{ positivity: -1, summary: "d", type: "hearsay" },
		);

		const metadata: EmployerRecordMetadata = EmployerRecord.toMetadata(record);

		expect(metadata.positiveCount).toBe(2);
		expect(metadata.negativeCount).toBe(1);

		expect(metadata.aliases).toBe(record.aliases);
		expect(metadata.employeesAfter).toBe(record.employeesAfter);
		expect(metadata.employeesBefore).toBe(record.employeesBefore);
		expect(metadata.id).toBe(record.id);
		expect(metadata.image).toBe(record.image);
		expect(metadata.location).toBe(record.location);
		expect(metadata.name).toBe(record.name);
		expect(metadata.officialWebsite).toBe(record.officialWebsite);
		expect(metadata.shortName).toBe(record.shortName);
		expect(metadata.status).toBe(record.status);
		expect(metadata.summary).toBe(record.summary);
		expect(metadata.ticker).toBe(record.ticker);
		expect(metadata.wiki).toBe(record.wiki);
	});
});
