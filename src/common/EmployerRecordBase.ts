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

	public static calculateRelationshipStrength(a: EmployerRecordBase, b: EmployerRecordBase): number {
		if (a.id === b.id) {
			return -1;
		}

		let score: number = 0;

		if (a.industries && b.industries && a.industries.length && b.industries.length) {
			let matchingIndustries: number = 0;

			let i: number = 0;
			let j: number = 0;

			while (i < a.industries.length && j < b.industries.length) {
				if (a.industries[i] < b.industries[j]) {
					i++;
					continue;
				}

				if (a.industries[i] > b.industries[j]) {
					j++;
					continue;
				}

				matchingIndustries++;
				i++;
				j++;
			}

			if (matchingIndustries === a.industries.length && matchingIndustries === b.industries.length) {
				score += matchingIndustries * 10;
			} else {
				score += matchingIndustries;
			}
		}

		if (a.parentId && a.parentId === b.parentId) {
			score += 100;
		}

		if (a.location && b.location) {
			score += a.location.international === b.location.international ? 1 : 0;
			score += a.location.country === b.location.country ? (a.location.city === b.location.city ? 5 : 3) : 0;
		}

		return score;
	}

	public static copyTo(original: EmployerRecordBase, target: EmployerRecordBase): void {
		target.aliases = original.aliases;
		target.employeesAfter = original.employeesAfter;
		target.employeesBefore = original.employeesBefore;
		target.id = original.id;
		target.image = original.image;
		target.industries = original.industries;
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
