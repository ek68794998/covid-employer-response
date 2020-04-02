import { Citation } from "./Citation";
import { EmployerEmployeeProfile } from "./EmployerEmployeeProfile";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerRating } from "./EmployerRating";

export class EmployerRecord {
	public citations: Citation[] = [];

	public employeesBefore: EmployerEmployeeProfile = new EmployerEmployeeProfile();

	public id: string = "";

	public image?: string;

	public location: EmployerLocation = new EmployerLocation();

	public name: string = "";

	public officialWebsite?: string;

	public rating: EmployerRating = "fair";

	public shortName?: string;

	public summary: string = "";

	public wiki?: string;
}
