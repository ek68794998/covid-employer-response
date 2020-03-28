import { EmployerRecord } from "../../../common/EmployerRecord";

export class EmployerListSearchFilter {
	public text: string = "";

	public static isMatch(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		const fieldsToSearch: string[] = [
			e.name.toLowerCase(),
			e.location.city.toLowerCase(),
		];

		return fieldsToSearch.some((field: string) => field.indexOf(f.text.toLowerCase()) >= 0);
	}
}