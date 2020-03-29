import { getCitationTypeValue } from "./CitationType";

describe("getCitationTypeValue", () => {
	test("properly ranks citation types", () => {
		expect(getCitationTypeValue("publication")).toBeGreaterThan(getCitationTypeValue("statement"));
		expect(getCitationTypeValue("statement")).toBeGreaterThan(getCitationTypeValue("hearsay"));
	});
});
