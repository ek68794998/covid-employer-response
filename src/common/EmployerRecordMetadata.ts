import { EmployerRating } from "./EmployerRating";
import { EmployerRecordBase } from "./EmployerRecordBase";

export class EmployerRecordMetadata extends EmployerRecordBase {
	public readonly negativeCount: number;

	public readonly positiveCount: number;

	public readonly rating: EmployerRating;

	public readonly score: number;

	public constructor(
		negativeCount: number,
		positiveCount: number,
		score: number,
		rating: EmployerRating,
	) {

		super();

		this.negativeCount = negativeCount;
		this.positiveCount = positiveCount;
		this.score = score;
		this.rating = rating;
	}

	public static getTrendIcon(e: EmployerRecordMetadata): "trending_up" | "trending_flat" | "trending_down" {
		switch (e.rating) {
			case "good":
				return "trending_up";

			case "poor":
				return "trending_down";

			case "fair":
			default:
				return "trending_flat";
		}
	}
}
