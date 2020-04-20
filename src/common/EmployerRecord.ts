import { Citation } from "./Citation";
import { EmployerRecordBase } from "./EmployerRecordBase";
import { EmployerRecordMetadata } from "./EmployerRecordMetadata";

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

		// Tweaking this to be larger than zero results in a broader range for "fair".
		let normalizedScore: number = 0;

		let negatives: number = 0;
		let positives: number = 0;
		let score: number = 0;

		if (citationRatings.length === 1) {
			score = citationRatings[0];
		} else if (citationRatings.length > 1) {
			normalizedScore = 1;

			let i: number = 0;
			let j: number = citationRatings.length - 1;

			while (j > i) {
				const left: number = citationRatings[i];
				const right: number = citationRatings[j];

				if (-left > right) {
					score += left + right;
					i++;

					continue;
				}

				if (right > -left) {
					score += left + right;
					j--;

					continue;
				}

				i++;
				j--;
			}

			for (i = 0; i < citationRatings.length; i++) {
				if (citationRatings[i] < 0) {
					negatives++;
				}

				if (citationRatings[i] > 0) {
					positives++;
				}
			}
		}

		const metadata: EmployerRecordMetadata =
			new EmployerRecordMetadata(
				negatives,
				positives,
				score > normalizedScore ? "good" : (score < -normalizedScore ? "poor" : "fair"));

		EmployerRecordBase.copyTo(original, metadata);

		return metadata;
	}
}
