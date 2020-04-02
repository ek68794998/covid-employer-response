import { Citation } from "./Citation";
import { EmployerEmployeeProfile } from "./EmployerEmployeeProfile";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerRating } from "./EmployerRating";

export class EmployerRecord {
	public aliases?: string[];

	public citations: Citation[] = [];

	public employeesBefore?: EmployerEmployeeProfile;

	public id: string = "";

	public image?: string;

	public location?: EmployerLocation;

	public name: string = "";

	public officialWebsite?: string;

	public shortName?: string;

	public summary: string = "";

	public wiki?: string;

	public static getRating(e: EmployerRecord): EmployerRating {
		const citationScore: number =
			e.citations
				.map((c: Citation) => c.positivity)
				.reduce((prev: number, curr: number) => prev + curr);

		const citationCount: number = e.citations.length;
		const normalizedScore: number = citationCount / 2;

		if (citationScore < normalizedScore && citationScore > -normalizedScore) {
			return "fair";
		}

		return citationScore > 0 ? "good" : "poor";
	}
}
