import { EmployerEmployeeProfile } from "./EmployerEmployeeProfile";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerRecord } from "./EmployerRecord";
import { EmployerRecordBase } from "./EmployerRecordBase";

describe("EmployerRecordBase", () => {
	test("copyTo properly copies attributes", () => {
		const record: EmployerRecord =
			Object.assign(
				new EmployerRecord(),
				{
					aliases: [ "foo" ],
					citations: [],
					employeesAfter: new EmployerEmployeeProfile(),
					employeesBefore: new EmployerEmployeeProfile(),
					id: "1",
					image: "2",
					location: new EmployerLocation(),
					name: "3",
					officialWebsite: "4",
					parentId: "9",
					shortName: "5",
					status: "active",
					summary: "6",
					ticker: "7",
					wiki: "8",
				});

		const copiedRecord: EmployerRecord = new EmployerRecord();

		EmployerRecordBase.copyTo(record, copiedRecord);

		expect(copiedRecord.aliases).toEqual(record.aliases);
		expect(copiedRecord.citations).toEqual(record.citations);
		expect(copiedRecord.employeesAfter).toEqual(record.employeesAfter);
		expect(copiedRecord.employeesBefore).toEqual(record.employeesBefore);
		expect(copiedRecord.id).toBe(record.id);
		expect(copiedRecord.image).toBe(record.image);
		expect(copiedRecord.location).toEqual(record.location);
		expect(copiedRecord.name).toBe(record.name);
		expect(copiedRecord.officialWebsite).toBe(record.officialWebsite);
		expect(copiedRecord.parentId).toBe(record.parentId);
		expect(copiedRecord.shortName).toBe(record.shortName);
		expect(copiedRecord.status).toBe(record.status);
		expect(copiedRecord.summary).toBe(record.summary);
		expect(copiedRecord.ticker).toBe(record.ticker);
		expect(copiedRecord.wiki).toBe(record.wiki);
	});
});
