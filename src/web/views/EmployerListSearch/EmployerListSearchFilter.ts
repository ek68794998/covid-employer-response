import { EmployerRecord } from "../../../common/EmployerRecord";

export class EmployerListSearchFilter {
	public international: boolean = false;

	public national: boolean = false;

	public text: string = "";

	public static isMatch(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		if (!EmployerListSearchFilter.isMatchForLocation(f, e)) {
			return false;
		}

		return EmployerListSearchFilter.isMatchForFullText(f, e);
	}

	private static isMatchForLocation(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		if (!e.location) {
			return false;
		}

		if (!f.international && !f.national) {
			return true;
		}

		if ((e.location.international && !f.international) || (!e.location.international && !f.national)) {
			return false;
		}

		return true;
	}

	private static isMatchForFullText(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		const fieldsToSearch: Array<string | undefined> = [
			e.name.toLowerCase(),
			e.location?.city.toLowerCase(),
		];

		if (e.aliases) {
			e.aliases.forEach((a: string) => fieldsToSearch.push(a));
		}

		return fieldsToSearch.some((field?: string) => field && field.indexOf(f.text.toLowerCase()) >= 0);
	}
}