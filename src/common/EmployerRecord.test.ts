import { Citation } from "./Citation";
import { CitationSource } from "./CitationSource";
import { EmployerRating } from "./EmployerRating";
import { EmployerRecord } from "./EmployerRecord";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

// This is a hack for the test thinking that the value passed as the expected result of a test data row is a string.
const er = (t: EmployerRating): EmployerRating => t;

const mockDatedSource =
	(d: string): CitationSource => ({ ...new CitationSource(), date: d });

describe("EmployerRecord", (): void => {
	test("getLastUpdateDate properly determines the date", (): void => {
		const record1: EmployerRecord = {
			...new EmployerRecord(),
			citations: [
				{ positivity: 2, sources: [ mockDatedSource("2020-03-05T12:00:00Z") ], summary: "a", type: "statement" },
				{ positivity: 1, sources: [ mockDatedSource("2020-03-01T00:00:00Z") ], summary: "b", type: "statement" },
				{ positivity: 0, summary: "c", type: "hearsay" },
				{ positivity: -1, summary: "d", type: "hearsay" },
			],
		};

		const record2: EmployerRecord = {
			...new EmployerRecord(),
			citations: [
				{ positivity: 2, sources: [ mockDatedSource("2020-03-01T00:00:00Z") ], summary: "a", type: "statement" },
				{ positivity: 1, sources: [ mockDatedSource("2025-03-01T00:00:00Z") ], summary: "b", type: "statement" },
				{ positivity: 0, summary: "c", type: "hearsay" },
				{ positivity: -1, summary: "d", type: "hearsay" },
			],
		};

		const record3: EmployerRecord = {
			...new EmployerRecord(),
			citations: [
				{ positivity: 2, sources: [ mockDatedSource("2020-03-06T00:00:00Z") ], summary: "a", type: "statement" },
				{
					positivity: 1,
					sources: [ mockDatedSource("2020-03-01T00:00:00Z"), mockDatedSource("2020-03-12T00:00:00Z") ],
					summary: "b",
					type: "statement",
				},
				{ positivity: 0, sources: [ mockDatedSource("2020-03-01T00:00:00Z") ], summary: "c", type: "hearsay" },
				{ positivity: -1, summary: "d", type: "hearsay" },
			],
		};

		const record4: EmployerRecord = {
			...new EmployerRecord(),
			citations: [
				{ positivity: -1, summary: "d", type: "hearsay" },
			],
		};

		const result1: Date = EmployerRecord.getLastUpdateDate(record1);
		const result2: Date = EmployerRecord.getLastUpdateDate(record2);
		const result3: Date = EmployerRecord.getLastUpdateDate(record3);
		const result4: Date = EmployerRecord.getLastUpdateDate(record4);

		expect(result1.toISOString()).toBe("2020-03-05T12:00:00.000Z");
		expect(result2.toISOString()).toBe("2025-03-01T00:00:00.000Z");
		expect(result3.toISOString()).toBe("2020-03-12T00:00:00.000Z");
		expect(result4.toISOString()).toBe("2000-01-01T12:00:00.000Z");
	});

	test.each([
		[ [], er("fair") ],
		[ [ 2 ], er("good") ],
		[ [ 1 ], er("fair") ],
		[ [ 0 ], er("fair") ],
		[ [ -1 ], er("fair") ],
		[ [ -2 ], er("poor") ],
		[ [ -1, 1 ], er("fair") ],
		[ [ 0, 2 ], er("good") ],
		[ [ 0, 1 ], er("fair") ],
		[ [ -1, 0 ], er("fair") ],
		[ [ -2, 0 ], er("poor") ],
		[ [ -1, -1, 1 ], er("fair") ],
		[ [ -1, 0, 1 ], er("fair") ],
		[ [ -2, 0, 2 ], er("fair") ],
		[ [ -1, 1, 1, 2 ], er("good") ],
		[ [ 1, 1, 0, 0 ], er("good") ],
		[ [ -1, 0, 1, 1 ], er("fair") ],
		[ [ -2, -1, 0, 0, 1 ], er("poor") ],
		[ [ 0, 0, 0, 0, 0 ], er("fair") ],
		[ [ -2, 0, 0, 0, 0 ], er("fair") ],
		[ [ 0, 0, 0, 1, 2 ], er("good") ],
		[ [ -1, 0, 0, 1, 1, 1 ], er("good") ],
		[ [ -1, -1, -1, 0, 0, 1 ], er("poor") ],
		[ [ -2, -2, -1, 0, 1, 1 ], er("poor") ],
		[ [ 0, 0, 0, 0, 0, 0, 1 ], er("fair") ],
		[ [ -1, 0, 0, 0, 1, 1, 1 ], er("good") ],
		[ [ -1, -1, -1, -1, 0, 0, 0 ], er("poor") ],
		[ [ 1, 1, 1, 1, 1, 1, 1 ], er("good") ],
		[ [ -1, -1, -1, -1, -1, -1, -1 ], er("poor") ],
	])(
		"toMetadata properly calculates %p ratings as %p (%#)",
		(ratings: number[], expected: EmployerRating): void => {
			const record: EmployerRecord = new EmployerRecord();

			record.citations =
				ratings.map((r: number): Citation => ({
					positivity: r,
					sources: [ new CitationSource() ],
					summary: "N/A",
					type: "statement",
				}));

			expect(EmployerRecord.toMetadata(record).rating).toBe(expected);
		},
	);

	test("toMetadata properly creates an object", (): void => {
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
