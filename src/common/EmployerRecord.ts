import { Citation } from "./Citation";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerRating } from "./EmployerRating";

export class EmployerRecord {
	public citations: Citation[] = [];

	public employeesBeforeMax: number = -1;

	public employeesBeforeMin: number = -1;

	public id: string = "";

	public image?: string;

	public location: EmployerLocation = new EmployerLocation();

	public name: string = "";

	public officialWebsite?: string;

	public rating: EmployerRating = "fair";

	public summary: string = "";

	public wiki?: string;
}
