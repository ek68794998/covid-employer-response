import { LocalizedStrings } from "../../common/LocalizedStrings";

import { LocaleLoader } from "./LocaleLoader";

describe("LocaleLoader", (): void => {
	test("throws exceptions if data folder does not exist", async (): Promise<void> => {
		const loader: LocaleLoader =
			new LocaleLoader("./not-real", "strings");

		expect(loader.getAllIdsAsync({})).rejects.toBeInstanceOf(Error);
		expect(loader.getAsync("en-us", {})).rejects.toBeInstanceOf(Error);
		expect(loader.getAllAsync({})).rejects.toBeInstanceOf(Error);
	});

	test("throws exception if loadAsync cannot find data file", async (): Promise<void> => {
		const loader: LocaleLoader =
			new LocaleLoader("./public", "strings");

		expect(loader.getAsync("not-a-real-locale", {})).rejects.toBeInstanceOf(Error);
	});

	test("can load and parse all locales", async (): Promise<void> => {
		const loader: LocaleLoader =
			new LocaleLoader("./public", "strings");

		const locales: LocalizedStrings[] = await loader.getAllAsync({});

		expect(locales.length).toBeGreaterThan(0);

		locales.forEach((record: LocalizedStrings): void => {
			expect(record).not.toBeNull();
		});
	});
});
