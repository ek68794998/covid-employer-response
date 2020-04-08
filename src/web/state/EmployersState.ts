import { EmployerRecord } from "../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../common/EmployerRecordMetadata";

export interface EmployersState {
	itemsComplete?: { [id: string]: EmployerRecord };

	itemsMetadata?: { [id: string]: EmployerRecordMetadata };
}
