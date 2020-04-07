export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public international: boolean = false;

	public state?: string;

	public wiki?: string;

	public static toString(
		employerLocation: EmployerLocation,
		countryCodeMap?: { [key: string]: string },
		useShortText: boolean = false): string {

		const country: string =
			(countryCodeMap && employerLocation.country in countryCodeMap)
				? countryCodeMap[employerLocation.country]
				: employerLocation.country;

		if (useShortText) {
			return `${employerLocation.city}, ${country}`;
		}

		const locationAsString: string =
			employerLocation.state
				? `${employerLocation.city}, ${employerLocation.state}, ${country}`
				: `${employerLocation.city}, ${country}`;

		return employerLocation.international ? `${locationAsString} (Multinational)` : locationAsString;
	}
}