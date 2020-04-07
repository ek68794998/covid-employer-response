import { LocalizedStrings } from "../../common/LocalizedStrings";

import { EmployersState } from "./EmployersState";

export interface AppState {
	employers: EmployersState;

	environment: string;

	strings: LocalizedStrings;
}