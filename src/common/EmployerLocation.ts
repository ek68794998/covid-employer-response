export class EmployerLocation {
	public city: string = "";

	public country: string = "";

	public state?: string;
}

export const employerLocationToString = (location: EmployerLocation): string => {
	if (location.state) {
		return `${location.city}, ${location.state}, ${location.country}`;
	}

	return `${location.city}, ${location.country}`;
};