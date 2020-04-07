import { EmployerRating } from "./EmployerRating";
import { EmployerRecord } from "./EmployerRecord";

// This is a hack for the test thinking that the value passed as the expected result of a test data row is a string.
const er = (t: EmployerRating): EmployerRating => t;

describe("EmployerRecord", () => {
	test.each([
		[ [], er("fair") ],
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

	test("getRating properly generates based on EmployerRecord fields (%#)", () => {
		const record: EmployerRecord = new EmployerRecord();

		record.aliases = [ "a", "b" ];
		record.employeesBefore = { type: "approximately", upperBound: 200, year: 2000 };
		record.id = "foo";
		record.image = "foo.jpg";
		record.location = { city: "Seattle", country: "us", international: false };
		record.name = "Foo";
		record.officialWebsite = "foo.com";
		record.shortName = "F";
		record.summary = "Foo is something.";
		record.ticker = "FOO";
		record.wiki = "Foo, Inc.";

		record.citations = [{
			positivity: 0,
			summary: "A story.",
			type: "publication",
		}];

		const minimalClone: EmployerRecord = EmployerRecord.shallowClone(record, false);
		const normalClone: EmployerRecord = EmployerRecord.shallowClone(record, true);

		expect(minimalClone.aliases).toBe(record.aliases);
		expect(minimalClone.employeesBefore).toBe(record.employeesBefore);
		expect(minimalClone.id).toBe(record.id);
		expect(minimalClone.image).toBe(record.image);
		expect(minimalClone.location).toBe(record.location);
		expect(minimalClone.name).toBe(record.name);
		expect(minimalClone.officialWebsite).toBe(record.officialWebsite);
		expect(minimalClone.shortName).toBe(record.shortName);
		expect(minimalClone.summary).toBe(record.summary);
		expect(minimalClone.ticker).toBe(record.ticker);
		expect(minimalClone.wiki).toBe(record.wiki);

		expect(normalClone.aliases).toBe(record.aliases);
		expect(normalClone.employeesBefore).toBe(record.employeesBefore);
		expect(normalClone.id).toBe(record.id);
		expect(normalClone.image).toBe(record.image);
		expect(normalClone.location).toBe(record.location);
		expect(normalClone.name).toBe(record.name);
		expect(normalClone.officialWebsite).toBe(record.officialWebsite);
		expect(normalClone.shortName).toBe(record.shortName);
		expect(normalClone.summary).toBe(record.summary);
		expect(normalClone.ticker).toBe(record.ticker);
		expect(normalClone.wiki).toBe(record.wiki);

		expect(minimalClone.citations.length).toBe(0);
		expect(normalClone.citations).toBe(record.citations);
	});
});
