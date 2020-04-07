import { EmployerRecord } from "../../../common/EmployerRecord";

export class EmployerListSearchFilter {
	public static readonly SMALL_BOUNDARY: number = 1000;

	public static readonly LARGE_BOUNDARY: number = 100000;

	public international: boolean = true;

	public large: boolean = true;

	public medium: boolean = true;

	public national: boolean = true;

	public small: boolean = true;

	public text: string = "";

	public static isMatch(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		if (!this.isMatchForLocation(f, e)) {
			return false;
		}

		if (!this.isMatchForEmployeeCount(f, e)) {
			return false;
		}

		return this.isMatchForFullText(f, e);
	}

	private static isMatchForEmployeeCount(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		if (!e.employeesBefore) {
			return false;
		}

		const getNumberIsBetween = (v: number, lower: number, upper: number): boolean =>
			v >= lower && v <= upper;

		const getNumberIsMatch = (v: number): boolean => {
			if (!f.small && v <= this.SMALL_BOUNDARY) {
				return false;
			}

			if (!f.large && v >= this.LARGE_BOUNDARY) {
				return false;
			}

			if (!f.medium
				&& getNumberIsBetween(v, this.SMALL_BOUNDARY, this.LARGE_BOUNDARY)) {

				return false;
			}

			return true;
		};

		const lowerBound: number = e.employeesBefore.lowerBound || 0;
		const upperBound: number = Math.max(e.employeesBefore.upperBound, lowerBound);

		if (e.employeesBefore.type === "approximately"
			|| e.employeesBefore.type === "exactly"
			|| lowerBound <= 0) {

			return getNumberIsMatch(upperBound);
		}

		if (upperBound <= 0) {
			return getNumberIsMatch(lowerBound);
		}

		const rangeIncludesSmall: boolean = lowerBound < this.SMALL_BOUNDARY;

		const rangeIncludesMedium: boolean =
			getNumberIsBetween(lowerBound, this.SMALL_BOUNDARY, this.LARGE_BOUNDARY)
			|| getNumberIsBetween(upperBound, this.SMALL_BOUNDARY, this.LARGE_BOUNDARY);

		const rangeIncludesLarge: boolean = upperBound > this.LARGE_BOUNDARY;

		return (f.small && rangeIncludesSmall)
			|| (f.medium && rangeIncludesMedium)
			|| (f.large && rangeIncludesLarge);
	}

	private static isMatchForFullText(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		if (!f.text) {
			return true;
		}

		const fieldsToSearch: (string | undefined)[] = [
			e.name.toLowerCase(),
			e.location?.city.toLowerCase(),
			e.shortName?.toLowerCase(),
			e.ticker?.toLowerCase(),
		];

		if (e.aliases) {
			e.aliases.forEach((a: string) => fieldsToSearch.push(a));
		}

		return fieldsToSearch.some((field?: string) => field && field.indexOf(f.text.toLowerCase()) >= 0);
	}

	private static isMatchForLocation(f: EmployerListSearchFilter, e: EmployerRecord): boolean {
		if (!e.location) {
			return false;
		}

		if ((!f.international && e.location.international) || (!f.national && !e.location.international)) {
			return false;
		}

		return true;
	}
}