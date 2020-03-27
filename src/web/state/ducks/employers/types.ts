import { Action } from "redux";

import { EmployerRecord } from "../../../../common/EmployerRecord";

export const GetAllType: string = "getEmployersSuccess";
export const GetAllErrorType: string = "getEmployersError";

interface GetEmployersAction extends Action<typeof GetAllType> {
	payload: EmployerRecord[];
}

interface GetEmployersErrorAction extends Action<typeof GetAllErrorType> {
}

export type GetEmployersActionTypes = GetEmployersAction | GetEmployersErrorAction;
