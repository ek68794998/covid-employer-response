import { EmployerLocation } from "./EmployerLocation";

describe("EmployerLocation", () => {
	test.each([
		[ { city: "Foo", country: "Bar", international: false }, false, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false }, false, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: true }, false, "Foo, Bar (Int'l)" ],
		[ { city: "Foo Bar", country: "Baz", international: true }, false, "Foo Bar, Baz (Int'l)" ],
		[ { city: "Foo", country: "Bar", international: false, state: "Den" }, false, "Foo, Den, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false, state: "Den" }, false, "Foo Bar, Den, Baz" ],
		[ { city: "Foo", country: "Bar", international: true, state: "Den" }, false, "Foo, Den, Bar (Int'l)" ],
		[ { city: "Foo Bar", country: "Baz", international: true, state: "Den" }, false, "Foo Bar, Den, Baz (Int'l)" ],
		[ { city: "Foo", country: "Bar", international: false }, false, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false }, true, "Foo Bar" ],
		[ { city: "Foo", country: "Bar", international: true }, true, "Foo (Int'l)" ],
		[ { city: "Foo Bar", country: "Baz", international: true }, true, "Foo Bar (Int'l)" ],
		[ { city: "Foo", country: "Bar", international: false, state: "Den" }, true, "Foo" ],
		[ { city: "Foo Bar", country: "Baz", international: false, state: "Den" }, true, "Foo Bar" ],
		[ { city: "Foo", country: "Bar", international: true, state: "Den" }, true, "Foo (Int'l)" ],
		[ { city: "Foo Bar", country: "Baz", international: true, state: "Den" }, true, "Foo Bar (Int'l)" ],
	])(
		"toString properly generates based on EmployerLocation fields (%#)",
		(l: EmployerLocation, short: boolean, expected: string) => {
			expect(EmployerLocation.toString(l, short)).toBe(expected);
		},
	);
});
