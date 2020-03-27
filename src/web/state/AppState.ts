import { EmployerRecord } from "../../common/EmployerRecord";
import { LocalizedStrings } from "../../common/LocalizedStrings";

export interface AppState {
	employers: EmployerRecord[]; /* TODO Fix to not use array */

	strings: LocalizedStrings;
}