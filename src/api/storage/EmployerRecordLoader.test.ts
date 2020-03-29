import { EmployerRecord } from "../../common/EmployerRecord";

import { EmployerRecordLoader } from "./EmployerRecordLoader";

describe("EmployerRecordLoader", () => {
	test("throws exceptions if data folder does not exist", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./not-real", "employers");

		expect(loader.getAllIdsAsync()).rejects.toBeInstanceOf(Error);
		expect(loader.loadAsync("sample")).rejects.toBeInstanceOf(Error);
		expect(loader.loadAllAsync()).rejects.toBeInstanceOf(Error);
	});

	test("throws exception if loadAsync cannot find data file", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./public", "employers");

		expect(loader.loadAsync("not-a-real-employer")).rejects.toBeInstanceOf(Error);
	});

	test("can load and parse all records", async () => {
		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./public", "employers");

		const records: EmployerRecord[] = await loader.loadAllAsync();

		expect(records.length).toBeGreaterThan(0);

		records.forEach((record: EmployerRecord) => {
			expect(record.id).not.toBeNull();
			expect(record.name).not.toBeNull();
			expect(record.name.length).toBeGreaterThan(0);
			expect(record.location).not.toBeNull();
			expect(record.rating).not.toBeNull();
			expect(record.rating.length).toBeGreaterThan(0);
			expect(record.summary).not.toBeNull();
			expect(record.summary.length).toBeGreaterThan(0);
		});
	});

	test("can load and parse sample record with correct data", async () => {
		const dateToNumber = (date: string | Date | null): number => {
			return new Date(date || "").getTime();
		};

		const loader: EmployerRecordLoader =
			new EmployerRecordLoader("./public", "employers");

		const record: EmployerRecord = await loader.loadAsync("sample");

		expect(record.id).toBe("sample");
		expect(record.name).toBe("Contoso");
		expect(record.wiki).toBe("Example");
		expect(record.officialWebsite).toBe("http://example.com");
		expect(record.rating).toBe("fair");
		expect(record.employeesBeforeMax).toBe(500);
		expect(record.employeesBeforeMin).toBe(200);
		expect(record.summary).toBe("Generally regarded as treating employees unfairly. Provided paid sick leave 9 days after requested by employees. Did not lay off employees. Many employees not allowed to work from home.");

		expect(record.location.city).toBe("Seattle");
		expect(record.location.state).toBe("WA");
		expect(record.location.country).toBe("USA");
		expect(record.location.international).toBe(false);
		expect(record.location.wiki).toBe("Seattle");

		expect(record.citations.length).toBe(3);

		expect(record.citations[0].summary).toBe("Business does not meet \"essential\" qualifications but requested to be classified as essential.");
		expect(record.citations[0].positivity).toBe(0);
		expect(record.citations[0].type).toBe("statement");
		expect(record.citations[0].sources).not.toBeNull();
		expect(record.citations[0].sources?.length).toBe(1);

		expect(record.citations[0].sources?.[0].name).toBe("K5 News");
		expect(record.citations[0].sources?.[0].link).toBe("http://example.com/king5/1.html");
		expect(dateToNumber(record.citations[0].sources?.[0].date || "")).toBe(dateToNumber("2020-03-25T08:42:19Z"));

		expect(record.citations[1].summary).toBe("Employees who requested paid time off were rejected.");
		expect(record.citations[1].positivity).toBe(-1);
		expect(record.citations[1].type).toBe("publication");
		expect(record.citations[1].sources).not.toBeNull();
		expect((record.citations[1].sources || []).length).toBe(2);

		expect(record.citations[1].sources?.[0].name).toBe("New York Times");
		expect(record.citations[1].sources?.[0].link).toBe("http://example.com/nyt/1.html");
		expect(dateToNumber(record.citations[1].sources?.[0].date || "")).toBe(dateToNumber("2020-03-20T11:29:19Z"));

		expect(record.citations[1].sources?.[1].name).toBe("CNN");
		expect(record.citations[1].sources?.[1].link).toBe("http://example.com/cnn/2.html");
		expect(dateToNumber(record.citations[1].sources?.[1].date || "")).toBe(dateToNumber("2020-03-20T21:42:11Z"));

		expect(record.citations[2].summary).toBe("Sick employee was reported in workspace and was not sent home.");
		expect(record.citations[2].positivity).toBe(-1);
		expect(record.citations[2].type).toBe("hearsay");
		expect(record.citations[2].sources).not.toBeNull();
		expect((record.citations[2].sources || []).length).toBe(1);

		expect(record.citations[2].sources?.[0].name).toBe("Twitter: John Doe");
		expect(record.citations[2].sources?.[0].link).toBe("http://twitter.com/not-a-real-twitter-acct/13814781");
		expect(dateToNumber(record.citations[2].sources?.[0].date || "")).toBe(dateToNumber("2020-03-16T20:14:14Z"));
	});
});
