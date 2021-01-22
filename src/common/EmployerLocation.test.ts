import { EmployerLocation } from "./EmployerLocation";

describe("EmployerLocation", (): void => {
	test("initializes with default values", (): void => {
		const l: EmployerLocation = new EmployerLocation();

		expect(l.city).toBe("");
		expect(l.country).toBe("");
		expect(l.international).toBe(false);
		expect(l.state).toBeFalsy();
		expect(l.wiki).toBeFalsy();
	});

	test.each([
		[ { city: "Foo", country: "Bar", international: false }, "Foo, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false }, "Foo Bar, Baz" ],
		[ { city: "Foo", country: "Bar", international: true }, "Foo, Bar (Multinational)" ],
		[ { city: "Foo Bar", country: "Baz", international: true }, "Foo Bar, Baz (Multinational)" ],
		[ { city: "Foo", country: "Bar", international: false, state: "Den" }, "Foo, Den, Bar" ],
		[ { city: "Foo Bar", country: "Baz", international: false, state: "Den" }, "Foo Bar, Den, Baz" ],
		[ { city: "Foo", country: "Bar", international: true, state: "Den" }, "Foo, Den, Bar (Multinational)" ],
		[ { city: "Foo Ba", country: "Baz", international: true, state: "Den" }, "Foo Ba, Den, Baz (Multinational)" ],
	])(
		"toString properly generates based on EmployerLocation fields (%#)",
		(l: EmployerLocation, expected: string): void => {
			expect(EmployerLocation.toString(l, {})).toBe(expected);
		},
	);
});
