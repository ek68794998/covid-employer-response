import { EmployerRecord } from "../../../common/EmployerRecord";

export class EmployerListSearchFilter {
	public text: string = "";

	public static isMatch(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		return e.name.toLowerCase().indexOf(f.text.toLowerCase()) >= 0;
	}
}