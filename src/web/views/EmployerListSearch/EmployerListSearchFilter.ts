import { EmployerRecord } from "../../../common/EmployerRecord";

export class EmployerListSearchFilter {
	public internationalType?: boolean;

	public text: string = "";

	public static isMatch(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		const fieldsToSearch: Array<string | undefined> = [
			e.name.toLowerCase(),
			e.location?.city.toLowerCase(),
		];

		if (e.aliases) {
			e.aliases.forEach((a: string) => fieldsToSearch.push(a));
		}

		if (f.internationalType === true || f.internationalType === false) {
			if (!e.location || f.internationalType !== e.location.international) {
				return false;
			}
		}

		return fieldsToSearch.some((field?: string) => field && field.indexOf(f.text.toLowerCase()) >= 0);
	}
}