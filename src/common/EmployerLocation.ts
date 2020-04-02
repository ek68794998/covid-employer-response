export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public international: boolean = false;

	public state?: string;

	public wiki?: string;
}

export const employerLocationToString =
	(location: EmployerLocation, useShortText: boolean = false): string => {
		const cityAsString: string =
			useShortText
				? location.city
				: location.state
					? `${location.city}, ${location.state}, ${location.country}`
					: `${location.city}, ${location.country}`;

		return location.international ? `${cityAsString} (Int'l)` : cityAsString;
	};