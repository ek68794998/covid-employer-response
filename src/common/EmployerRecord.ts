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
		let citations: Citation[] = [];

		const addCitations = (e?: EmployerRecord): void => {
			if (!e?.citations) {
				return;
			}

			citations = citations.concat(e.citations);
		};

		addCitations(original);

		if (employerReferenceMap) {
			if (original.parentId) {
				addCitations(employerReferenceMap[original.parentId]);
			}

			original.childIds.forEach((childId: string) => addCitations(employerReferenceMap[childId]));
		}

		const fairNeutralRatio: number = 0.78;

		let negatives: number = 0;
		let positives: number = 0;
		let sum: number = 0;

		for (const citation of citations) {
			let rating: number = citation.positivity;

			if (!citation.sources || !citation.sources.length) {
				rating *= 0.25;
			} else if (citation.type === "hearsay") {
				rating *= 0.75;
			}

			sum += rating;

			if (rating < 0) {
				negatives++;
			}

			if (rating > 0) {
				positives++;
			}
		}

		const neutrals: number = citations.length - negatives - positives;

		let ratingResult: EmployerRating = "fair";

		if (sum !== 0 && negatives + positives > 0 && neutrals / citations.length < fairNeutralRatio) {
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
