import { Citation } from "./Citation";
import { EmployerEmployeeProfile } from "./EmployerEmployeeProfile";
import { EmployerLocation } from "./EmployerLocation";
import { EmployerRating } from "./EmployerRating";
import { EmployerRecordBase } from "./EmployerRecordBase";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

export class EmployerRecord extends EmployerRecordBase {
	public citations: Citation[] = [];

	public employeesBefore?: EmployerEmployeeProfile;

	public officialWebsite?: string;

	public summary: string = "";

	public wiki?: string;

	public static getRating(e: EmployerRecord): EmployerRating {
		if (!e.citations.length) {
			return "fair";
		}

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

	public static toMetadata(original: EmployerRecord): EmployerRecordMetadata {
		const metadata: EmployerRecordMetadata =
			new EmployerRecordMetadata(this.getRating(original));

		EmployerRecordBase.copyTo(original, metadata);

		return metadata;
	}
}
