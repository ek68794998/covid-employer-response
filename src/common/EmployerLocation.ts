export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public international: boolean = false;

	public state?: string;

	public wiki?: string;

	public static toString(
		location: EmployerLocation,
		countryCodeMap?: { [key: string]: string },
		useShortText: boolean = false): string {

		const country: string =
			(countryCodeMap && location.country in countryCodeMap) ? countryCodeMap[location.country] : location.country;

		if (useShortText) {
			return `${location.city}, ${country}`;
		}

		const locationAsString: string =
			location.state
				? `${location.city}, ${location.state}, ${country}`
				: `${location.city}, ${country}`;

		return location.international ? `${locationAsString} (Multinational)` : locationAsString;
	}
}