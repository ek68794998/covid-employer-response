import fs from "fs";

import { EmployerRecordLoader } from "../api/storage/EmployerRecordLoader";
import { Citation } from "../common/Citation";
import { CitationSource } from "../common/CitationSource";
import { CitationTypeValues } from "../common/CitationType";
import { EmployerEmployeeProfile, EmployerEmployeeProfileTypeValues } from "../common/EmployerEmployeeProfile";
import { EmployerIndustryValues, EmployerIndustry } from "../common/EmployerIndustry";
import { EmployerRecord } from "../common/EmployerRecord";
import { EmployerRecordBase } from "../common/EmployerRecordBase";
import { EmployerStatusValues } from "../common/EmployerStatus";

const directory: string = "./public";
const subDirectory: string = "employers";

const dateToNumber = (date: string | Date | null): number => new Date(date || "").getTime();

const recordIds: string[] =
	fs.readdirSync(`${directory}/${subDirectory}`)
		.filter((file: string) => file.indexOf(".yml") > 0)
		.map((file: string) => file.split(".")[0]);

describe("employer records", () => {
	const isValidEmployeeCount = (p: EmployerEmployeeProfile): boolean =>
		EmployerEmployeeProfileTypeValues.indexOf(p.type) >= 0
		&& !!p.toString();

	const isValidParagraph = (sentence: string): boolean =>
		/^[A-Z].*\.$/.exec(sentence)
			&& !/\. [a-z]/g.exec(sentence)
			&& sentence.indexOf("  ") < 0
			|| false;

	const loader: EmployerRecordLoader =
		new EmployerRecordLoader(directory, subDirectory);

	test("exist", () => {
		expect(recordIds.length).toBeGreaterThan(0);
	});

	test.each(
		recordIds.map((recordId: string) => [ recordId ]),
	)("can load and parse %p (%#)", async (id: string) => {
		if (id === "_sample") {
			// The sample file has some invalid dates, etc., so don't include it here.
			return;
		}

		const record: EmployerRecord = await loader.getAsync(id, {});

		if (!record.id || !/^[a-z0-9-]+$/.exec(record.id)) {
			return fail(`ID '${record.id}' for ${id} is invalid.`);
		}

		if (!record.name) {
			return fail(`Name for ${id} must not be empty.`);
		}

		if (record.image) {
			if (!record.image.startsWith(`${record.id}.`)) {
				return fail(`Image '${record.image}' should match profile ID for ${id}.`);
			}

			const parsedImage: RegExpExecArray | null = EmployerRecordBase.IMAGE_REGEX.exec(record.image);

			if (!parsedImage) {
				return fail(`Image '${record.image}' for ${id} is not a valid image string.`);
			}

			if (!fs.existsSync(`./public/images/employers/${parsedImage[1]}`)) {
				return fail(`Image '${parsedImage[1]}' for ${id} does not exist in the image folder.`);
			}
		}

		if (record.officialWebsite) {
			try {
				new URL(record.officialWebsite);
			} catch (e) {
				return fail(`Official website '${record.officialWebsite}' for ${id} is invalid: '${e}'`);
			}
		}

		if (EmployerStatusValues.indexOf(record.status) < 0) {
			return fail(`Employer status '${record.status}' for ${id} is invalid.`);
		}

		if (record.industries && record.industries.length) {
			for (let i: number = 1; i <= record.industries.length; i++) {
				const industry: EmployerIndustry = record.industries[i - 1];

				if (EmployerIndustryValues.indexOf(industry) < 0) {
					return fail(`Industry #${i} for ${id} '${industry}' is not in the list of valid values.`);
				}
			}
		}

		if (record.location) {
			if (!record.location.city
				|| record.location.city[0] !== record.location.city[0].toUpperCase()) {

				return fail(`City name '${record.location.city}' for ${id} is not valid.`);
			}

			if (!record.location.country
				|| !/^[a-z]{2}$/.exec(record.location.country)) {

				return fail(`Country code '${record.location.country}' for ${id} is not valid.`);
			}
		}

		if (record.employeesAfter && !isValidEmployeeCount(record.employeesAfter)) {
			return fail(`"After" employee count for ${id} is invalid.`);
		}

		if (record.employeesBefore && !isValidEmployeeCount(record.employeesBefore)) {
			return fail(`"Before" employee count for ${id} is invalid.`);
		}

		const summaryLength: number = record.summary ? record.summary.length : 0;

		if (summaryLength < 100 || summaryLength > 350) {
			return fail(`Employer summary length ${summaryLength} for ${id} is invalid.`);
		}

		if (!isValidParagraph(record.summary)) {
			return fail(`Employer summary for ${id} contains invalid punctuation or capitalization.`);
		}

		if (!record.citations || record.citations.length === 0) {
			return fail(`Citations list for ${id} must not be empty.`);
		}

		for (let i: number = 1; i <= record.citations.length; i++) {
			const citation: Citation = record.citations[i - 1];

			if (citation.positivity < -2 || citation.positivity > 2) {
				return fail(`Citation #${i} positivity rating ${citation.positivity} for ${id} is invalid.`);
			}

			const citationSummaryLength: number = record.summary ? record.summary.length : 0;

			if (citationSummaryLength < 10) {
				return fail(`Citation #${i} summary for ${id} has invalid length ${citationSummaryLength}.`);
			}

			if (!isValidParagraph(record.summary)) {
				return fail(`Citation #${i} summary for ${id} contains invalid punctuation or capitalization.`);
			}

			if (CitationTypeValues.indexOf(citation.type) < 0) {
				return fail(`Citation #${i} for ${id} has invalid type'${citation.type}'.`);
			}

			if (!citation.sources || citation.sources.length === 0) {
				if (citation.type === "hearsay") {
					continue;
				}

				return fail(`Citation #${i} for ${id} is not hearsay and must have sources.`);
			}

			for (let j: number = 1; j <= citation.sources.length; j++) {
				const source: CitationSource = citation.sources[j - 1];

				if (!source.source) {
					return fail(`Citation #${i} for ${id} source #${j} is invalid.`);
				}

				try {
					new URL(source.link);
				} catch (e) {
					return fail(`Citation #${i} for ${id} source #${j} URL '${source.link}' is invalid: '${e}'`);
				}

				if (!source.date) {
					continue;
				}

				const date: Date = new Date(source.date);

				if (isNaN(date.getTime())) {
					return fail(`Citation #${i} for ${id} source #${j} date '${source.date}' is improperly formatted.`);
				}

				if (date < new Date("2019-11-01T00:00:00Z")) {
					return fail(`Citation #${i} for ${id} source #${j} date '${source.date}' is invalid.`);
				}
			}
		}

		return;
	});

	test("have correct sample data", async () => {
		const record: EmployerRecord = await loader.getAsync("_sample", {});

		expect(record.id).toBe("_sample");
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
