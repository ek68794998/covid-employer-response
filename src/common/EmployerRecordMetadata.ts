import { EmployerRating } from "./EmployerRating";
import { EmployerRecordBase } from "./EmployerRecordBase";

export class EmployerRecordMetadata extends EmployerRecordBase {
	public readonly negativeCount: number;

	public readonly positiveCount: number;

	public readonly ratingValue: EmployerRating;

	public constructor(
		negativeCount: number,
		positiveCount: number,
		ratingValue: EmployerRating) {

		super();

		this.negativeCount = negativeCount;
		this.positiveCount = positiveCount;
		this.ratingValue = ratingValue;
	}

	public get rating(): EmployerRating {
		return this.ratingValue;
	}
}
