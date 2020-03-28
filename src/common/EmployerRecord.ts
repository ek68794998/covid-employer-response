import { Citation } from "./Citation";
import { EmployerLocation } from "./EmployerLocation";

export class EmployerRecord {
	public citations: Citation[] = [];

	public employeesBeforeMax: number = -1;

	public employeesBeforeMin: number = -1;

	public id: string = "";

	public location?: EmployerLocation;

	public name: string = "";

	public officialWebsite?: string;

	public rating: number = 0;

	public summary: string = "";

	public wiki?: string;
}
