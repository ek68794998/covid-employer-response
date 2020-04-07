import { Action } from "redux";

import { EmployerRecord } from "../../../../common/EmployerRecord";

export const GetAllType: string = "getEmployersSuccess";
export const GetAllErrorType: string = "getEmployersError";

interface GetEmployersAction extends Action<typeof GetAllType> {
	payload: EmployerRecord[];
}

type GetEmployersErrorAction = Action<typeof GetAllErrorType>;

export type GetEmployersActionTypes = GetEmployersAction | GetEmployersErrorAction;
