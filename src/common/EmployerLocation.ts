export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public international: boolean = false;

	public state?: string;

	public wiki?: string;
}

export const employerLocationToString = (location: EmployerLocation): string => {
	const cityAsString: string =
		location.state
			? `${location.city}, ${location.state}, ${location.country}`
			: `${location.city}, ${location.country}`;

	return location.international ? `International (${cityAsString})` : cityAsString;
};