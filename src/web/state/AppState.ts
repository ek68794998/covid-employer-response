import { EmployerRecord } from "../../common/EmployerRecord";
import { LocalizedStrings } from "../../common/LocalizedStrings";

export interface AppState {
	employers: EmployerRecord[];

	strings: LocalizedStrings;
}