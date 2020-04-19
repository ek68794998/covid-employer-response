import { Citation } from "./Citation";
import { EmployerRating } from "./EmployerRating";
import { EmployerRecordBase } from "./EmployerRecordBase";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

export class EmployerRecord extends EmployerRecordBase {
	public childIds: string[] = [];

	public citations: Citation[] = [];

	public static calculateRating(
		citationCount: number,
		score: number,
	): EmployerRating {
		if (citationCount === 0) {
			return "fair";
		}

		const normalizedScore: number = citationCount / 2;

		if (score < normalizedScore && score > -normalizedScore) {
			return "fair";
		}

		return score > 0 ? "good" : "poor";
	}

	public static toMetadata(
		original: EmployerRecord,
		employerReferenceMap?: { [key: string]: EmployerRecord },
	): EmployerRecordMetadata {
		let citationCount: number = 0;
		let score: number = 0;
		let positives: number = 0;
		let negatives: number = 0;

		const updateRatings = (e?: EmployerRecord): void => {
			if (!e) {
				return;
			}

			for (const citation of e.citations) {
				citationCount++;
				score += citation.positivity;

				if (citation.positivity > 0) {
					positives++;
				} else if (citation.positivity < 0) {
					negatives++;
				}
			}
		};

		updateRatings(original);

		if (employerReferenceMap) {
			if (original.parentId) {
				updateRatings(employerReferenceMap[original.parentId]);
			}

			original.childIds.forEach((childId: string) => updateRatings(employerReferenceMap[childId]));
		}

		const metadata: EmployerRecordMetadata =
			new EmployerRecordMetadata(negatives, positives, this.calculateRating(citationCount, score));

		EmployerRecordBase.copyTo(original, metadata);

		return metadata;
	}
}
