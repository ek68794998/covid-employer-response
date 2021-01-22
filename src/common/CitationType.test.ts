import { getCitationTypeValue } from "./CitationType";

describe("getCitationTypeValue", (): void => {
	test("properly ranks citation types", (): void => {
		expect(getCitationTypeValue("publication")).toBeGreaterThan(getCitationTypeValue("statement"));
		expect(getCitationTypeValue("statement")).toBeGreaterThan(getCitationTypeValue("hearsay"));
		expect(getCitationTypeValue(undefined)).toBeLessThan(getCitationTypeValue("hearsay"));
	});
});
