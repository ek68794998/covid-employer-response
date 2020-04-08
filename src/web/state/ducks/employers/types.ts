import { Action } from "redux";

import { EmployerRecord } from "../../../../common/EmployerRecord";
import { EmployerRecordMetadata } from "../../../../common/EmployerRecordMetadata";

export const GetEmployersByIdType: string = "getEmployersByIdSuccess";
export const GetEmployersByIdErrorType: string = "getEmployersByIdError";

export const GetEmployersListType: string = "getEmployersSuccess";
export const GetEmployersListErrorType: string = "getEmployersError";

interface GetEmployersByIdAction extends Action<typeof GetEmployersListType> {
	payload: EmployerRecord[];
}

type GetEmployersByIdErrorAction = Action<typeof GetEmployersListErrorType>;

export type GetEmployersByIdActionTypes = GetEmployersByIdAction | GetEmployersByIdErrorAction;

interface GetEmployersListAction extends Action<typeof GetEmployersByIdType> {
	payload: EmployerRecordMetadata[];
}

type GetEmployersListErrorAction = Action<typeof GetEmployersByIdErrorType>;

export type GetEmployersListActionTypes = GetEmployersListAction | GetEmployersListErrorAction;
