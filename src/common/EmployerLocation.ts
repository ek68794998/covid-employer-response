export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public international: boolean = false;

	public state?: string;

	public wiki?: string;

	public static toString(
		location: EmployerLocation,
		countryCodeMap?: { [key: string]: string }): string {

		const country: string =
			(countryCodeMap && location.country in countryCodeMap) ? countryCodeMap[location.country] : location.country;

		const locationAsString: string =
			location.state
				? `${location.city}, ${location.state}, ${country}`
				: `${location.city}, ${country}`;

		return location.international ? `${locationAsString} (Multinational)` : locationAsString;
	}
}