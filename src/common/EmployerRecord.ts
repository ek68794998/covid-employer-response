import { Citation } from "./Citation";
import { EmployerRating } from "./EmployerRating";
import { EmployerRecordBase } from "./EmployerRecordBase";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

export class EmployerRecord extends EmployerRecordBase {
	public citations: Citation[] = [];

	public get rating(): EmployerRating {
		return EmployerRecord.getRating(this);
	}

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
		let positives: number = 0;
		let negatives: number = 0;

		for (const citation of original.citations) {
			if (citation.positivity > 0) {
				positives++;
			} else if (citation.positivity < 0) {
				negatives++;
			}
		}

		const metadata: EmployerRecordMetadata =
			new EmployerRecordMetadata(negatives, positives, this.getRating(original));

		EmployerRecordBase.copyTo(original, metadata);

		return metadata;
	}
}
