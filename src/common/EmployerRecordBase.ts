import { EmployerEmployeeProfile } from "./EmployerEmployeeProfile";
import { EmployerIndustry } from "./EmployerIndustry";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerStatus } from "./EmployerStatus";

export abstract class EmployerRecordBase {
	public static readonly IMAGE_REGEX: RegExp = /^([a-z0-9-]+\.(?:png|svg|jpe?g))(#[a-f0-9]{6})?$/;

	public aliases?: string[];

	public employeesAfter?: EmployerEmployeeProfile;

	public employeesBefore?: EmployerEmployeeProfile;

	public id: string = "";

	public image?: string;

	public industries?: EmployerIndustry[];

	public location?: EmployerLocation;

	public name: string = "";

	public officialWebsite?: string;

	public parentId?: string;

	public shortName?: string;

	public status: EmployerStatus = "active";

	public summary: string = "";

	public ticker?: string;

	public wiki?: string;

	public static copyTo(original: EmployerRecordBase, target: EmployerRecordBase): void {
		target.aliases = original.aliases;
		target.employeesAfter = original.employeesAfter;
		target.employeesBefore = original.employeesBefore;
		target.id = original.id;
		target.image = original.image;
		target.location = original.location;
		target.name = original.name;
		target.officialWebsite = original.officialWebsite;
		target.parentId = original.parentId;
		target.shortName = original.shortName;
		target.status = original.status;
		target.summary = original.summary;
		target.ticker = original.ticker;
		target.wiki = original.wiki;
	}
}
