export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public international: boolean = false;

	public state?: string;

	public wiki?: string;

	public static toString(location: EmployerLocation, useShortText: boolean = false): string {
		if (useShortText) {
			return `${location.city}, ${location.country}`;
		}

		const locationAsString: string =
			location.state
				? `${location.city}, ${location.state}, ${location.country}`
				: `${location.city}, ${location.country}`;

		return location.international ? `${locationAsString} (Multinational)` : locationAsString;
	}
}