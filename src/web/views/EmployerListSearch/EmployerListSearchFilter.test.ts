import { EmployerRecord } from "../../../common/EmployerRecord";

import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

describe("EmployerListSearchFilter", () => {
	const createEmployerRecordDataRow = (overrides: Partial<EmployerRecord>): EmployerRecord => {
		const base: EmployerRecord = new EmployerRecord();

		return { ...base, ...overrides };
	};

	test.each([
		[ { text: "" }, createEmployerRecordDataRow({}), false ],
		[ { text: "" }, createEmployerRecordDataRow({ name: "foo" }), true ],
		[ { text: "f" }, createEmployerRecordDataRow({ name: "foo" }), true ],
		[ { text: "o" }, createEmployerRecordDataRow({ name: "foo" }), true ],
		[ { text: "fo" }, createEmployerRecordDataRow({ name: "foo" }), true ],
		[ { text: "foo" }, createEmployerRecordDataRow({ name: "foo" }), true ],
		[ { text: "afoo" }, createEmployerRecordDataRow({ name: "foo" }), false ],
		[ { text: "fooa" }, createEmployerRecordDataRow({ name: "foo" }), false ],
		[ { text: "" }, createEmployerRecordDataRow({ name: "FOO" }), true ],
		[ { text: "F" }, createEmployerRecordDataRow({ name: "FOO" }), true ],
		[ { text: "o" }, createEmployerRecordDataRow({ name: "FOO" }), true ],
		[ { text: "fO" }, createEmployerRecordDataRow({ name: "FOO" }), true ],
		[ { text: "Foo" }, createEmployerRecordDataRow({ name: "FOO" }), true ],
		[ { text: "aFOO" }, createEmployerRecordDataRow({ name: "FOO" }), false ],
		[ { text: "FOOa" }, createEmployerRecordDataRow({ name: "FOO" }), false ],
		[ { text: "fO" }, createEmployerRecordDataRow({ aliases: [ "bar", "foo" ] }), true ],
		[ { text: "Foooo" }, createEmployerRecordDataRow({ aliases: [ "bar", "foo" ] }), false ],
		[ { text: "BA" }, createEmployerRecordDataRow({ aliases: [ "bar", "foo" ] }), true ],
		[ { text: "barr" }, createEmployerRecordDataRow({ aliases: [ "bar", "foo" ] }), false ],
	])(
		"properly matches inputs with isMatch (%#)",
		(f: EmployerListSearchFilter, r: EmployerRecord, expected: boolean) => {
			expect(EmployerListSearchFilter.isMatch(f, r)).toBe(expected);
		},
	);
});
