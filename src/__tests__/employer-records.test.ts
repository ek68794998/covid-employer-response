import fs from "fs";

import { EmployerRecordLoader } from "../api/storage/EmployerRecordLoader";
import { EmployerRecord } from "../common/EmployerRecord";

const directory: string = "./public";
const subDirectory: string = "employers";

const dateToNumber = (date: string | Date | null): number => new Date(date || "").getTime();

const recordIds: string[] =
	fs.readdirSync(`${directory}/${subDirectory}`)
		.filter((file: string) => file.indexOf(".yml") > 0)
		.map((file: string) => file.split(".")[0]);

describe("employer records", () => {
	const loader: EmployerRecordLoader =
		new EmployerRecordLoader(directory, subDirectory);

	test("exist", () => {
		expect(recordIds.length).toBeGreaterThan(0);
	});

	test.each(
		recordIds.map((recordId: string) => [ recordId ]),
	)("can load and parse %p (%#)", async (recordId: string) => {
		const record: EmployerRecord = await loader.getAsync(recordId, {});

		if (record.id === "sample") {
			// The sample file has some invalid dates, etc., so don't include it here.
			return;
		}

		expect(record.id).not.toBeNull();
		expect(record.name).not.toBeNull();
		expect(record.name.length).toBeGreaterThan(0);
		expect(record.summary).not.toBeNull();
		expect(record.summary.length).toBeGreaterThanOrEqual(100);
		expect(record.summary.length).toBeLessThanOrEqual(350);

		if (record.location) {
			expect(record.location.city).toBeTruthy();
			expect(record.location.country).toBeTruthy();
		}

		expect(record.citations.length).toBeGreaterThan(0);

		for (const citation of record.citations) {
			expect(citation.positivity).toBeGreaterThanOrEqual(-2);
			expect(citation.positivity).toBeLessThanOrEqual(2);
			expect(citation.summary.length).toBeGreaterThan(10);

			if (citation.type !== "hearsay") {
				expect(citation.sources?.length).toBeGreaterThan(0);
			}

			if (!citation.sources) {
				continue;
			}

			for (const source of citation.sources) {
				expect(source.name.length).toBeTruthy();
				expect(new URL(source.link).hostname).toBeTruthy();

				if (!source.date) {
					continue;
				}

				expect(dateToNumber(source.date)).toBeGreaterThan(new Date("2019-11-01T00:00:00Z").getTime());
			}
		}
	});

	test("have correct sample data", async () => {
		const record: EmployerRecord = await loader.getAsync("sample", {});

		expect(record.id).toBe("sample");
		expect(record.name).toBe("Contoso");
		expect(record.aliases?.[0]).toBe("MyContoso");
		expect(record.aliases?.[1]).toBe("TheContoso");
		expect(record.shortName).toBe("Co.");
		expect(record.ticker).toBe("CTS");
		expect(record.wiki).toBe("Example");
		expect(record.officialWebsite).toBe("http://example.com/about");

		expect(record.industries.length).toBe(2);
		expect(record.industries[0]).toBe("software");
		expect(record.industries[1]).toBe("videoGames");

		expect(record.employeesBefore?.lowerBound).toBe(200);
		expect(record.employeesBefore?.type).toBe("range");
		expect(record.employeesBefore?.upperBound).toBe(500);
		expect(record.employeesBefore?.year).toBe(2019);
		expect(record.employeesBefore?.yearQuarter).toBe("Q1");
		expect(record.summary).toBe("Generally regarded as treating employees unfairly. Provided paid sick leave 9 days after requested by employees. Did not lay off employees. Many employees not allowed to work from home.");

		expect(record.location?.city).toBe("Seattle");
		expect(record.location?.state).toBe("WA");
		expect(record.location?.country).toBe("us");
		expect(record.location?.international).toBe(false);
		expect(record.location?.wiki).toBe("Seattle");

		expect(record.citations.length).toBe(3);

		expect(record.citations[0].summary).toBe("Business does not meet \"essential\" qualifications but requested to be classified as essential.");
		expect(record.citations[0].positivity).toBe(0);
		expect(record.citations[0].type).toBe("statement");
		expect(record.citations[0].sources).not.toBeNull();
		expect(record.citations[0].sources?.length).toBe(1);

		expect(record.citations[0].sources?.[0].name).toBe("K5 News");
		expect(record.citations[0].sources?.[0].link).toBe("http://example.com/king5/1.html");
		expect(dateToNumber(record.citations[0].sources?.[0].date || "")).toBe(dateToNumber("2000-01-01T01:00:00Z"));

		expect(record.citations[1].summary).toBe("Employees who requested paid time off were rejected.");
		expect(record.citations[1].positivity).toBe(-1);
		expect(record.citations[1].type).toBe("publication");
		expect(record.citations[1].sources).not.toBeNull();
		expect((record.citations[1].sources || []).length).toBe(2);

		expect(record.citations[1].sources?.[0].name).toBe("New York Times");
		expect(record.citations[1].sources?.[0].link).toBe("http://example.com/nyt/1.html");
		expect(dateToNumber(record.citations[1].sources?.[0].date || "")).toBe(dateToNumber("2000-01-01T02:00:00Z"));

		expect(record.citations[1].sources?.[1].name).toBe("CNN");
		expect(record.citations[1].sources?.[1].link).toBe("http://example.com/cnn/2.html");
		expect(dateToNumber(record.citations[1].sources?.[1].date || "")).toBe(dateToNumber("2000-01-01T03:00:00Z"));

		expect(record.citations[2].summary).toBe("Sick employee was reported in workspace and was not sent home.");
		expect(record.citations[2].positivity).toBe(-1);
		expect(record.citations[2].type).toBe("hearsay");
		expect(record.citations[2].sources).not.toBeNull();
		expect((record.citations[2].sources || []).length).toBe(1);

		expect(record.citations[2].sources?.[0].name).toBe("Twitter: John Doe");
		expect(record.citations[2].sources?.[0].link).toBe("http://twitter.com/not-a-real-twitter-acct/13814781");
		expect(dateToNumber(record.citations[2].sources?.[0].date || "")).toBe(dateToNumber("2000-01-01T04:00:00Z"));
	});
});
