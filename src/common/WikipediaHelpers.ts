export class WikipediaHelpers {
	public static getWikipediaUrl(pageName?: string): string | null {
		if (!pageName) {
			return null;
		}

		const wikipediaUrlBase: string = "https://en.wikipedia.org/wiki/__PAGE__";
		const pageNameSubpath: string = pageName.replace(" ", "_");

		return wikipediaUrlBase.replace("__PAGE__", pageNameSubpath);
	}
}
