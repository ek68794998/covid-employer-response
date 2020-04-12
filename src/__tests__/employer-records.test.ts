import fs from "fs";

import { EmployerRecordLoader } from "../api/storage/EmployerRecordLoader";
import { Citation } from "../common/Citation";
import { CitationSource } from "../common/CitationSource";
import { EmployerIndustryValues, EmployerIndustry } from "../common/EmployerIndustry";
import { EmployerRecord } from "../common/EmployerRecord";

const directory: string = "./public";
const subDirectory: string = "employers";

const dateToNumber = (date: string | Date | null): number => new Date(date || "").getTime();

const recordIds: string[] =
	fs.readdirSync(`${directory}/${subDirectory}`)
		.filter((file: string) => file.indexOf(".yml") > 0)
		.map((file: string) => file.split(".")[0]);

describe("employer records", () => {
	expect.extend({
		toBeValidEmployerRecord: (received: EmployerRecord, recordId: string): jest.CustomMatcherResult => {
			const isValidParagraph = (sentence: string): boolean =>
				/^[A-Z].*\.$/.exec(sentence)
					&& !/\. [a-z]/g.exec(sentence)
					&& sentence.indexOf("  ") < 0
					|| false;

			if (!received.id) {
				fail(`ID for ${recordId} must not be empty.`);
			}

			if (!received.name) {
				fail(`Name for ${recordId} must not be empty.`);
			}

			if (received.industries && received.industries.length) {
				for (let i: number = 1; i <= received.industries.length; i++) {
					const industry: EmployerIndustry = received.industries[i - 1];

					if (EmployerIndustryValues.indexOf(industry) < 0) {
						fail(`Industry #${i} for ${recordId} '${industry}' is not in the list of valid values.`);
					}
				}
			}

			const summaryLength: number = received.summary ? received.summary.length : 0;

			if (summaryLength < 100 || summaryLength > 350) {
				fail(`Employer summary length ${summaryLength} for ${recordId} is invalid.`);
			}

			if (!isValidParagraph(received.summary)) {
				fail(`Employer summary for ${recordId} contains invalid punctuation or capitalization.`);
			}

			if (received.location) {
				if (!received.location.city
					|| received.location.city[0] !== received.location.city[0].toUpperCase()) {

					fail(`City name '${received.location.city}' for ${recordId} is not valid.`);
				}

				if (!received.location.country
					|| !/^[a-z]{2}$/.exec(received.location.country)) {

					fail(`Country code '${received.location.country}' for ${recordId} is not valid.`);
				}
			}

			if (!received.citations || received.citations.length === 0) {
				fail(`Citations list for ${recordId} must not be empty.`);
			}

			for (let i: number = 1; i <= received.citations.length; i++) {
				const citation: Citation = received.citations[i - 1];

				if (citation.positivity < -2 || citation.positivity > 2) {
					fail(`Citation #${i} positivity rating ${citation.positivity} for ${recordId} is invalid.`);
				}

				const citationSummaryLength: number = received.summary ? received.summary.length : 0;

				if (citationSummaryLength < 10) {
					fail(`Citation #${i} summary for ${recordId} has invalid length ${citationSummaryLength}.`);
				}

				if (!isValidParagraph(received.summary)) {
					fail(`Citation #${i} summary for ${recordId} contains invalid punctuation or capitalization.`);
				}

				if (!citation.sources || citation.sources.length === 0) {
					if (citation.type === "hearsay") {
						continue;
					}

					fail(`Citation #${i} for ${recordId} is not hearsay and must have sources.`);
				}

				for (let j: number = 1; j <= citation.sources.length; j++) {
					const source: CitationSource = citation.sources[j - 1];

					if (!source.source) {
						fail(`Citation #${i} for ${recordId} source #${j} is invalid.`);
					}

					try {
						new URL(source.link);
					} catch (e) {
						fail(`Citation #${i} for ${recordId} source #${j} URL '${source.link}' is invalid: '${e}'`);
					}

					if (!source.date) {
						continue;
					}

					const date: Date = new Date(source.date);

					if (isNaN(date.getTime())) {
						fail(`Citation #${i} for ${recordId} source #${j} date '${source.date}' is improperly formatted.`);
					}

					if (date < new Date("2019-11-01T00:00:00Z")) {
						fail(`Citation #${i} for ${recordId} source #${j} date '${source.date}' is invalid.`);
					}
				}
			}

			return {
				message: (): string => "",
				pass: true,
			};
		},
	});

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

		(expect(record) as any).toBeValidEmployerRecord(recordId);
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

		expect(record.industries?.length).toBe(2);
		expect(record.industries?.[0]).toBe("software");
		expect(record.industries?.[1]).toBe("videoGames");

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

		expect(record.citations[0].sources?.[0].source).toBe("K5 News");
		expect(record.citations[0].sources?.[0].link).toBe("http://example.com/king5/1.html");
		expect(dateToNumber(record.citations[0].sources?.[0].date || "")).toBe(dateToNumber("2000-01-01T01:00:00Z"));

		expect(record.citations[1].summary).toBe("Employees who requested paid time off were rejected.");
		expect(record.citations[1].positivity).toBe(-1);
		expect(record.citations[1].type).toBe("publication");
		expect(record.citations[1].sources).not.toBeNull();
		expect((record.citations[1].sources || []).length).toBe(2);

		expect(record.citations[1].sources?.[0].source).toBe("New York Times");
		expect(record.citations[1].sources?.[0].link).toBe("http://example.com/nyt/1.html");
		expect(dateToNumber(record.citations[1].sources?.[0].date || "")).toBe(dateToNumber("2000-01-01T02:00:00Z"));

		expect(record.citations[1].sources?.[1].source).toBe("CNN");
		expect(record.citations[1].sources?.[1].link).toBe("http://example.com/cnn/2.html");
		expect(dateToNumber(record.citations[1].sources?.[1].date || "")).toBe(dateToNumber("2000-01-01T03:00:00Z"));

		expect(record.citations[2].summary).toBe("Sick employee was reported in workspace and was not sent home.");
		expect(record.citations[2].positivity).toBe(-1);
		expect(record.citations[2].type).toBe("hearsay");
		expect(record.citations[2].sources).not.toBeNull();
		expect((record.citations[2].sources || []).length).toBe(1);

		expect(record.citations[2].sources?.[0].source).toBe("Twitter");
		expect(record.citations[2].sources?.[0].title).toBe("John Doe");
		expect(record.citations[2].sources?.[0].link).toBe("http://twitter.com/not-a-real-twitter-acct/13814781");
		expect(dateToNumber(record.citations[2].sources?.[0].date || "")).toBe(dateToNumber("2000-01-01T04:00:00Z"));
	});
});
