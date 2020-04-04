import { EmployerLocation } from "./EmployerLocation";

describe("EmployerLocation", () => {
	test("initializes with default values", () => {
		const l: EmployerLocation = new EmployerLocation();

		expect(l.city).toBe("");
		expect(l.country).toBe("");
		expect(l.international).toBe(false);
		expect(l.state).toBeFalsy();
		expect(l.wiki).toBeFalsy();
	});

	test.each([
		[ { city: "Foo", country: "Bar", international: false }, false, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false }, false, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: true }, false, "Foo, Bar (Multinational)" ],
		[ { city: "Foo Bar", country: "Baz", international: true }, false, "Foo Bar, Baz (Multinational)" ],
		[ { city: "Foo", country: "Bar", international: false, state: "Den" }, false, "Foo, Den, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false, state: "Den" }, false, "Foo Bar, Den, Baz" ],
		[ { city: "Foo", country: "Bar", international: true, state: "Den" }, false, "Foo, Den, Bar (Multinational)" ],
		[ { city: "Foo Ba", country: "Baz", international: true, state: "Den" }, false, "Foo Ba, Den, Baz (Multinational)" ],
		[ { city: "Foo", country: "Bar", international: false }, false, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false }, true, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: true }, true, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: true }, true, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: false, state: "Den" }, true, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false, state: "Den" }, true, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: true, state: "Den" }, true, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: true, state: "Den" }, true, "Foo Bar, Baz" ],
	])(
		"toString properly generates based on EmployerLocation fields (%#)",
		(l: EmployerLocation, short: boolean, expected: string) => {
			expect(EmployerLocation.toString(l, short)).toBe(expected);
		},
	);
});
