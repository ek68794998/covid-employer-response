import { EmployerRating } from "../../common/EmployerRating";
import { EmployerRecord } from "../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../common/EmployerRecordMetadata";

export interface EmployersState {
	byCategory?: { [category: string]: string[] };

	byRating?: { [rating in EmployerRating]: string[] };

	itemsComplete?: { [id: string]: EmployerRecord };

	itemsMetadata?: { [id: string]: EmployerRecordMetadata };
}
