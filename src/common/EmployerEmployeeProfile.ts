import { EmployeeNumber } from "./EmployeeNumber";

export type EmployerEmployeeProfileType =
	"range"
	| "approximately"
	| "exactly";

export class EmployerEmployeeProfile {
	public lowerBound?: number;

	public type: EmployerEmployeeProfileType = "exactly";

	public upperBound: number = 0;

	public year: number = 0;

	public yearQuarter?: "Q1" | "Q2" | "Q3" | "Q4";

	public static toString(p: EmployerEmployeeProfile, includeDate: boolean, useShortText: boolean): string | null {
		const lowerBound: EmployeeNumber | null =
			(p.lowerBound && p.lowerBound > 0) ? new EmployeeNumber(p.lowerBound) : null;

		const upperBound: EmployeeNumber | null =
			p.upperBound > 0 ? new EmployeeNumber(p.upperBound) : null;

		let employeeCountString: string;

		switch (p.type) {
			case "approximately":
				if (!upperBound) {
					throw new Error("Invalid value for approximate string conversion.");
				}

				employeeCountString = upperBound.toString(useShortText);

				if (!upperBound.getMagnitudeLabel()) {
					employeeCountString = `~${employeeCountString}`;
				}

				break;

			case "range":
				if (lowerBound && upperBound) {
					if (lowerBound.exactValue > upperBound.exactValue) {
						throw new Error("Lower bound is greater than or equal to upper bound specified for range string conversion.");
					}

					employeeCountString =
						(lowerBound.magnitude && lowerBound.magnitude === upperBound.magnitude)
							? `${lowerBound.getAdjustedValue()} ${String.fromCharCode(0x2013)} ${upperBound.toString(useShortText)}`
							: `${lowerBound.toString(useShortText)} ${String.fromCharCode(0x2013)} ${upperBound.toString(useShortText)}`;
				} else if (lowerBound) {
					employeeCountString =
						useShortText
							? `${String.fromCharCode(0x2265)} ${lowerBound.toString(useShortText)}`
							: `More than ${lowerBound.toString(useShortText)}`;
				} else if (upperBound) {
					employeeCountString =
						useShortText
							? `${String.fromCharCode(0x2264)} ${upperBound.toString(useShortText)}`
							: `Less than ${upperBound.toString(useShortText)}`;
				} else {
					throw new Error("Invalid lower and upper bounds specified for range string.");
				}

				break;

			case "exactly":
			default:
				if (!upperBound) {
					throw new Error("Invalid value for default string conversion.");
				}

				employeeCountString = upperBound.toString(useShortText);

				break;
		}

		if (includeDate && p.year > 0) {
			const dateString: string =
				p.yearQuarter ? `${p.yearQuarter} ${p.year}` : `${p.year}`;

			employeeCountString = `${employeeCountString} (${dateString})`;
		}

		return employeeCountString;
	}
}
