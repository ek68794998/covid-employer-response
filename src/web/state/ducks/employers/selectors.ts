import { AppState } from "../../AppState";

import { EmployerRecord } from "../../../../common/EmployerRecord";

export const getEmployers = (state: AppState): EmployerRecord[] => state && state.employers && state.employers.items;