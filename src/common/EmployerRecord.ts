import { Citation } from "./Citation";
import { EmployerRecordBase } from "./EmployerRecordBase";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";
import { EmployerRating } from "./EmployerRating";

export class EmployerRecord extends EmployerRecordBase {
	public childIds: string[] = [];

	public citations: Citation[] = [];

	public static toMetadata(
		original: EmployerRecord,
		employerReferenceMap?: { [key: string]: EmployerRecord },
	): EmployerRecordMetadata {
		let citationRatings: number[] = [];

		const addCitations = (e?: EmployerRecord): void => {
			if (!e?.citations) {
				return;
			}

			e.citations.forEach((c: Citation) => {
				citationRatings.push(c.positivity);
			});
		};

		addCitations(original);

		if (employerReferenceMap) {
			if (original.parentId) {
				addCitations(employerReferenceMap[original.parentId]);
			}

			original.childIds.forEach((childId: string) => addCitations(employerReferenceMap[childId]));
		}

		citationRatings = citationRatings.sort();

		const fairNeutralRatio: number = 0.78;

		let negatives: number = 0;
		let positives: number = 0;
		let sum: number = 0;

		for (const rating of citationRatings) {
			sum += rating;

			if (rating < 0) {
				negatives++;
			}

			if (rating > 0) {
				positives++;
			}
		}

		const neutrals: number = citationRatings.length - negatives - positives;

		let ratingResult: EmployerRating = "fair";

		if (sum !== 0 && negatives + positives > 0 && neutrals / citationRatings.length < fairNeutralRatio) {
			const score: number = Math.log10((negatives + positives) * Math.abs(sum)) + 1;

			ratingResult = sum > score ? "good" : (sum < -score ? "poor" : "fair");
		}

		const metadata: EmployerRecordMetadata =
			new EmployerRecordMetadata(
				negatives,
				positives,
				ratingResult);

		EmployerRecordBase.copyTo(original, metadata);

		return metadata;
	}
}
