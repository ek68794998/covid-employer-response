import { LocalizedStrings } from "../../common/LocalizedStrings";

import { LocaleLoader } from "./LocaleLoader";

describe("LocaleLoader", () => {
	test("throws exceptions if data folder does not exist", async () => {
		const loader: LocaleLoader =
			new LocaleLoader("./not-real", "strings");

		expect(loader.getAllIdsAsync()).rejects.toBeInstanceOf(Error);
		expect(loader.getAsync("sample")).rejects.toBeInstanceOf(Error);
		expect(loader.getAllAsync()).rejects.toBeInstanceOf(Error);
	});

	test("throws exception if loadAsync cannot find data file", async () => {
		const loader: LocaleLoader =
			new LocaleLoader("./public", "strings");

		expect(loader.getAsync("not-a-real-locale")).rejects.toBeInstanceOf(Error);
	});

	test("can load and parse all locales", async () => {
		const loader: LocaleLoader =
			new LocaleLoader("./public", "strings");

		const locales: LocalizedStrings[] = await loader.getAllAsync();

		expect(locales.length).toBeGreaterThan(0);

		locales.forEach((record: LocalizedStrings) => {
			expect(record).not.toBeNull();
		});
	});
});
