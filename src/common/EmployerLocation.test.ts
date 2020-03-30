import { EmployerLocation, employerLocationToString } from "./EmployerLocation";

describe("employerLocationToString", () => {
	test.each([
		[ { city: "Foo", country: "Bar", international: false }, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false }, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: true }, "Foo, Bar (Int'l)" ],
		[ { city: "Foo Bar", country: "Baz", international: true }, "Foo Bar, Baz (Int'l)" ],
		[ { city: "Foo", country: "Bar", international: false, state: "Den" }, "Foo, Den, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false, state: "Den" }, "Foo Bar, Den, Baz" ],
		[ { city: "Foo", country: "Bar", international: true, state: "Den" }, "Foo, Den, Bar (Int'l)" ],
		[ { city: "Foo Bar", country: "Baz", international: true, state: "Den" }, "Foo Bar, Den, Baz (Int'l)" ],
	])("properly generates based on EmployerLocation fields", (l: EmployerLocation, expected: string) => {
		expect(employerLocationToString(l)).toBe(expected);
	});
});
