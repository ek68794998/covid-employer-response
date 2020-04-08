import { EmployerEmployeeProfile } from "./EmployerEmployeeProfile";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerRating } from "./EmployerRating";

export abstract class EmployerRecordBase {
	public aliases?: string[];

	public employeesBefore?: EmployerEmployeeProfile;

	public id: string = "";

	public image?: string;

	public location?: EmployerLocation;

	public name: string = "";

	public officialWebsite?: string;

	public shortName?: string;

	public summary: string = "";

	public ticker?: string;

	public wiki?: string;

	public abstract get rating(): EmployerRating;

	public static copyTo(original: EmployerRecordBase, target: EmployerRecordBase): void {
		target.aliases = original.aliases;
		target.employeesBefore = original.employeesBefore;
		target.id = original.id;
		target.image = original.image;
		target.location = original.location;
		target.name = original.name;
		target.officialWebsite = original.officialWebsite;
		target.shortName = original.shortName;
		target.summary = original.summary;
		target.ticker = original.ticker;
		target.wiki = original.wiki;
	}
}
