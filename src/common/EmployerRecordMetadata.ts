import { EmployerRating } from "./EmployerRating";
import { EmployerRecordBase } from "./EmployerRecordBase";

export class EmployerRecordMetadata extends EmployerRecordBase {
	public readonly rating: EmployerRating;

	public constructor(rating: EmployerRating) {
		super();

		this.rating = rating;
	}
}
